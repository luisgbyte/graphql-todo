import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

const todo = {
  Query: {
    todos: combineResolvers(
      isAuthenticated, async (parent: any, { id, offset = 0, limit = 100 }: any, { models }: any) => {

        return await models.Todo.findAll({
          offset,
          limit,
          where: { userId: id }
        })
      })
  },
  Todo: {
    // LIST 'USER' IN TODO
    user: combineResolvers(isAuthenticated,
      async (parent: any, args: any, { models }: any) => {
        return await models.User.findOne({
          where: {
            id: parent.dataValues.userId,
          },
        });
      })
  },
  Mutation: {
    // CREATE
    createTodo: combineResolvers(isAuthenticated,
      async (_: any, args: any, { models }: any) => {
        const { title, description, userId } = args;

        try {
          return await models.Todo.create({
            title,
            description,
            userId,
          });
        } catch (error: any) {
          throw new Error(error);
        }
      }),
    // DELETE
    deleteTodo: combineResolvers(isAuthenticated,
      async (_: any, { id }: any, { models }: any) => {
        return await models.Todo.destroy({ where: { id } });
      }),
    // UPDATE
    updateTodo: combineResolvers(isAuthenticated,
      async (_: any, args: any, { models }: any) => {
        const { id, title, description } = args;

        try {
          await models.Todo.update({
            title,
            description,
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
  }
}

export default todo