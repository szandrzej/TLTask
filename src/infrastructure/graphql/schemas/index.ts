import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { loginSchema } from './loginSchema';
import { usersSchema } from './usersSchema';
import { createUserSchema } from './createUserSchema';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
      ...usersSchema,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...loginSchema,
      ...createUserSchema,
    },
  }),
});
