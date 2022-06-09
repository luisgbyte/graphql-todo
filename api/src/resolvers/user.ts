import jwt from 'jsonwebtoken';

const createToken = async (user: any, secret: string, expiresIn: string) => {
  const { id, email, name } = user;

  return await jwt.sign({ id, email, name }, secret, {
    expiresIn,
  });
};

const user = {
  Query: {
    // SHOW USER FOR ID
    user: async (parent: any, args: any, { models }: any) => {
      return await models.User.findByPk(args.id);
    },
    // SHOW ALL USERS
    users: async (parent: any, args: any, { models }: any) => {
      return await models.User.findAll();
    },
  },
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
    deleteUser: async (_: any, { id }: any, { models }: any) => {
      return await models.User.destroy({ where: { id } });
    },
    // UPDATE
    updateUser: async (_: any, args: any, { models }: any) => {
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
    },
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
  },
}
export default user