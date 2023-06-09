import { User } from '@/infrastructure/graphql/documents/users';
import { UserOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

const columns: ColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: value => (
      <Avatar src={value} shape="square" size={32} icon={<UserOutlined rev={undefined} />} />
    ),
    width: 80,
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: 'Last login',
    dataIndex: 'lastLogin',
    render: value => (value ? new Date(value).toLocaleString() : '---'),
    sorter: true,
  },
  {
    title: 'Admin',
    dataIndex: 'isAdmin',
    render: value =>
      value ? <CheckCircleOutlined rev={undefined} /> : <CloseCircleOutlined rev={undefined} />,
  },
];

export interface UsersTableProps {
  page: number;
  pageSize: number;
  usersTotal: number;
  users: User[];
  onTableParamsChange: TableProps<User>['onChange'];
}

export const UsersTable = ({
  users,
  page,
  pageSize,
  usersTotal,
  onTableParamsChange: handleTableChange,
}: UsersTableProps) => {
  return (
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={users}
      pagination={{ current: page, pageSize, total: usersTotal }}
      loading={false}
      onChange={handleTableChange}
      sticky
    />
  );
};
