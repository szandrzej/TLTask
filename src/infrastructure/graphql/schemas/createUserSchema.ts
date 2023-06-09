import { createUserResolver } from '@/infrastructure/graphql/resolvers';
import { CreateUserInput, CreateUserOutput } from '../types/CreateUser';

export const createUserSchema = {
  createUser: {
    type: CreateUserOutput,
    args: {
      newUser: {
        type: CreateUserInput,
      },
    },
    resolve: createUserResolver,
  },
};
