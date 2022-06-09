import { AuthenticationError, UserInputError } from 'apollo-server';

import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

import jwt from 'jsonwebtoken';
import User from '../models/user';


const createToken = async (user: any, secret: string, expiresIn: string) => {
  const { id, email, name } = user;

  return await jwt.sign({ id, email, name }, secret, {
    expiresIn,
  });
};

const user = {
  User: {
    // LIST 'TODOS' IN USER
    todo: async (parent: any, args: any, { models }: any) => {
      return await models.Todo.findAll({
        where: {
          userId: parent.dataValues.id,
        },
      });
    }
  },
  Mutation: {
    // DELETE
    deleteUser: combineResolvers(isAuthenticated,
      async (_: any, { id }: any, { models }: any) => {
        return await models.User.destroy({ where: { id } });
      }),
    // UPDATE
    updateUser: combineResolvers(isAuthenticated,
      async (_: any, args: any, { models }: any) => {
        const { id, name, email, password } = args;

        try {
          await models.User.update({
            name,
            email,
            password,
          }, {
            where: {
              id: id
            }
          });

          return { ...args }
        } catch (error: any) {
          throw new Error(error);
        }
      }),
    // SIGN-UP
    signUp: async (parent: any, { name, email, password }: any, { models, secret
    }: any) => {
      const user = await models.User.create({
        name,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },
    //SIGN-IN
    signIn: async (parent: any, { email, password }: any, { models, secret }: any) => {

      const user = await models.User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await User.validatePassword(user, password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '30m') };
    },
  },
}
export default user