
const todo = {
  Query: {
    // SHOW ALL TODOS
    todos: async (parent: any, args: any, { models }: any) => {
      return await models.Todo.findAll();
    },
  },
  Mutation: {
    // CREATE
    createTodo: async (_: any, args: any, { models }: any) => {
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
    },

    // DELETE
    deleteTodo: async (_: any, { id }: any, { models }: any) => {
      return await models.Todo.destroy({ where: { id } });
    },

    // UPDATE
    updateTodo: async (_: any, args: any, { models }: any) => {
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
    },
  }
}

export default todo