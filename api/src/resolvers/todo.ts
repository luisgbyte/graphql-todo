import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

const todo = {
  Query: {
    todos: combineResolvers(
      isAuthenticated, async (parent: any, { offset = 0, limit = 100 }: any, { models, me }: any) => {

        return await models.Todo.findAll({
          offset,
          limit,
          where: { userId: me.id }
        })
      })
  },
  Todo: {
    // LIST 'USER' IN TODO
    user: combineResolvers(isAuthenticated,
      async (parent: any, _: any, { models, me }: any) => {
        return await models.User.findOne({
          where: {
            id: me.id,
          },
        });
      })
  },
  Mutation: {
    // CREATE
    createTodo: combineResolvers(isAuthenticated,
      async (_: any, args: any, { models, me }: any) => {
        const { title, description } = args;

        try {
          return await models.Todo.create({
            title,
            description,
            userId: me.id,
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
      async (_: any, args: any, { models, me }: any) => {
        const { id, title, description, completed } = args;

        const oldTodo = await models.Todo.findByPk(id);

        if (oldTodo === null || me.id !== oldTodo.userId) {
          throw new Error("An error occurred in the operation! Permission denied or task does not exist.");
        }

        try {
          await models.Todo.update({
            title,
            description,
            completed
          }, {
            where: {
              id: id
            }
          });

          return await models.Todo.findByPk(id);

        } catch (error: any) {
          throw new Error(error);
        }
      }),
  }
}

export default todo