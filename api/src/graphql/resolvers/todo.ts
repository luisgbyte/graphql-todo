import { v4 as uuidv4 } from 'uuid';
import { todos } from '../models';

const todo = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    // CREATE
    createTodo: (_: any, args: any) => {
      const { title, description, userId } = args;

      const id = uuidv4();

      const novo = {
        id,
        title,
        description,
        completed: false,
        userId
      };

      todos.push(novo)
      return novo
    },

    // DELETE
    deleteTodo: (_: any, { id }: any) => {
      const i = todos.findIndex(t => t.id === id)

      if (i < 0) return null

      const remove = todos.splice(i, 1)

      return remove ? remove[0] : null
    },

    // UPDATE
    updateTodo: (_: any, args: any) => {
      const { id } = args;

      const i = todos.findIndex(t => t.id == id)

      if (i < 0) return null

      const newTodo = {
        ...todos[i],
        ...args
      }

      todos.splice(i, 1, newTodo)

      return newTodo
    },
  }
}

export default todo