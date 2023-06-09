import { attributeFields } from 'graphql-sequelize';
import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql/index';
import { User as UserModel } from '@/infrastructure/database/models';

export const CreateUserOutput = new GraphQLObjectType({
  name: 'CreateUserOutput',
  description: 'Create user type',
  fields: () => ({ id: { type: GraphQLString } }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  description: 'Create user model',
  fields: Object.assign(
    attributeFields(UserModel, {
      exclude: ['lastLogin', 'createdAt', 'updatedAt', 'deletedAt', 'ip', 'id'],
    }),
    {}
  ),
});
