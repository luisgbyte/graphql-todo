import { todos, users } from '../mocks'
import { v4 as uuidv4 } from 'uuid';

const user = {
  Query: {
    // users: () => users,
    // user(_: any, { id }: any) {
    //   let res = users.filter((u) => u.id == id)
    //   return res ? res[0] : null
    // },
    users: async (parent: any, args: any, { models }: any) => {
      return await models.user.findAll();
    },
  },
  Mutation: {
    // CREATE
    createUser: (_: any, args: any) => {
      const { name, email, password } = args;

      const id = uuidv4();

      const newUser = {
        id,
        name,
        email,
        password,
        todos: []
      };

      users.push(newUser)
      return newUser
    },
    // DELETE
    deleteUser: (_: any, { id }: any) => {
      const i = users.findIndex(u => u.id === id)

      if (i < 0) return null

      const remove = users.splice(i, 1)

      return remove ? remove[0] : null
    },
    // UPDATE
    updateUser: (_: any, args: any) => {
      const { id } = args;

      const i = users.findIndex(u => u.id == id)

      if (i < 0) return null

      const newUser = {
        ...users[i],
        ...args
      }

      users.splice(i, 1, newUser)

      return newUser
    },
  },
  User: {
    todos(user: any) {
      return todos.filter(
        todo => todo.userId === user.id,
      );
    }
  },
}
export default user