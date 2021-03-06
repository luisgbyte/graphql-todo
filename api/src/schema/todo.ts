import { gql } from 'apollo-server';

export default gql`
  type Query {
    todos(offset: Int, limit: Int): [Todo]
  }

  type Todo {
    id: ID
    title: String
    description: String
    completed: Boolean
    user: User
  }

  type Mutation {
    createTodo(title: String!, description: String!): Todo!
    deleteTodo(id: ID!): Boolean!
    updateTodo(id: ID!, title: String, description: String, completed: Boolean): Todo
  }
`;