import { gql } from 'graphql-request';

export type LoginMutationVariables = {
  email: string;
  password: string;
};

export interface LoginMutationResponse {
  login: {
    token: string;
  };
}

export const loginMutationDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
