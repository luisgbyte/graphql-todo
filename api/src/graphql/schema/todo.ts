import { gql } from 'apollo-server';

export default gql`
  type Query {
    todos: [Todo]
  }

  type Todo {
    id: ID
    title: String
    description: String
    completed: Boolean
    user: User
  }

  type Mutation {
    createTodo(title: String, description: String, userId: ID!): Todo!
    deleteTodo(id: ID!): Todo
    updateTodo(id: ID!, title: String, description: String, completed: Boolean): Todo
  }
`;