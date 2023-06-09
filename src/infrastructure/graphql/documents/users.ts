import { UsersFilters } from '@/infrastructure/types/interfaces';
import { gql } from 'graphql-request';

export const usersQueryDocument = gql`
  query getUsers(
    $page: Int!
    $pageSize: Int!
    $order: UserOrder
    $dir: Dir
    $filters: UsersFilters
  ) {
    users(page: $page, pageSize: $pageSize, order: $order, dir: $dir, filters: $filters) {
      id
      email
      gender
      firstName
      lastName
      lastLogin
      isAdmin
      image
    }
    usersTotal
  }
`;

export const createUserMutationDocument = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(newUser: $user) {
      id
    }
  }
`;

export interface User {
  id: string;
  email: string;
  gender: 'M' | 'F';
  firstName: string;
  lastName: string;
  image: string;
  ip?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin: boolean;
}

export enum UsersSortOrder {
  ID = 'ID',
  GENDER = 'GENDER',
  LAST_LOGIN = 'LAST_LOGIN',
  EMAIL = 'EMAIL',
}

export enum UsersSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type UsersQueryVariables = {
  page: number;
  pageSize: number;
  order?: UsersSortOrder;
  dir?: UsersSortDirection;
  filters?: UsersFilters;
};

export interface UsersQueryResponse {
  users: User[];
  usersTotal: number;
}
