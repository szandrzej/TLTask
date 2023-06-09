import { Op } from 'sequelize';
import { GraphQLFieldResolver } from 'graphql/type/definition';
import { BadRequestError } from '@/infrastructure/errors';
import { GraphqlContext } from '@/infrastructure/types/interfaces';
import { User } from '@/infrastructure/database/models';
import { userGuard } from '../guards';

export const createUserResolver: GraphQLFieldResolver<
  undefined,
  GraphqlContext,
  {
    newUser: {
      firstName: string;
      lastName: string;
      image: string;
      gender: string;
      isAdmin: string;
      email: string;
      password: string;
    };
  }
> = async (parent, args, context) => {
  await userGuard(context.token);
  const user = await User.findOne({
    where: {
      email: { [Op.eq]: args.newUser.email },
      password: { [Op.eq]: args.newUser.password }, //pass as plaintext only for mock reasons
    },
  });
  if (user) {
    throw new BadRequestError();
  }
  await User.create(args.newUser);
  return {
    id: '12312312',
  };
};
