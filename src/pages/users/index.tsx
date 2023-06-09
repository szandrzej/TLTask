import {
  User,
  UsersQueryResponse,
  UsersQueryVariables,
  UsersSortDirection,
  UsersSortOrder,
  usersQueryDocument,
} from '@/infrastructure/graphql/documents/users';
import { TOKEN_COOKIE_NAME } from '@/lib/auth';
import { request } from 'graphql-request';
import { GetServerSideProps } from 'next';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import { UsersTable } from '@/components/UserTable';
import styles from '@/styles/Users.module.scss';
import { Button } from 'antd';
import Link from 'next/link';

const DEFAULT_PAGE_SIZE = 20;

const querySortFieldMapping: Record<string, UsersSortOrder> = {
  id: UsersSortOrder.ID,
  gender: UsersSortOrder.GENDER,
  lastLogin: UsersSortOrder.LAST_LOGIN,
  email: UsersSortOrder.EMAIL,
};

const querySortDirectionMapping: Record<string, UsersSortDirection> = {
  ['ascend']: UsersSortDirection.ASC,
  ['descend']: UsersSortDirection.DESC,
};

interface UsersPageProps extends UsersQueryResponse, TableParams {}

interface TableParams {
  page?: number;
  pageSize: number;
  sortField?: UsersSortOrder;
  sortOrder?: UsersSortDirection;
  filters?: Record<string, FilterValue | null>;
}

export default function UsersPage({ users, usersTotal, page, pageSize }: UsersPageProps) {
  const { push } = useRouter();

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: unknown,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    const { field, order } = sorter as SorterResult<User>;
    const queryParameters = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      field,
      order,
    };

    push(`/users?${qs.stringify(queryParameters)}`);
  };

  return (
    <div className={styles.container}>
      <Link href="/users/new">
        <Button type="primary">Add new</Button>
      </Link>
      <div className={styles.usersTable}>
        <UsersTable
          users={users}
          page={page ?? 0}
          pageSize={pageSize}
          usersTotal={usersTotal}
          onTableParamsChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async ({
  req: { cookies },
  query,
}) => {
  const queryObject = qs.parse(querystring.encode(query));

  const tableParams = {
    page: Number(queryObject.page) || 1,
    pageSize: Number(queryObject.pageSize) || DEFAULT_PAGE_SIZE,
    sortField: querySortFieldMapping[(queryObject.field as string) ?? 'id'],
    sortOrder: querySortDirectionMapping[(queryObject.order as string) ?? 'ascend'],
  };

  const data = await request<UsersQueryResponse, UsersQueryVariables>({
    url: process.env.NEXT_PUBLIC_GQL_API_URL,
    document: usersQueryDocument,
    requestHeaders: {
      Authorization: `Bearer ${cookies[TOKEN_COOKIE_NAME]}`,
    },
    variables: {
      page: tableParams.page,
      pageSize: tableParams.pageSize,
      order: tableParams.sortField,
      dir: tableParams.sortOrder,
      filters: undefined,
    },
  });

  return {
    props: {
      users: data.users,
      usersTotal: data.usersTotal,
      ...tableParams,
    },
  };
};
