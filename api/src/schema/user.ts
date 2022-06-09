import { gql } from 'apollo-server';

export default gql`
   type Query {
    users: [User]
    user(id: Int): User
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
    todo: [Todo!] 
  }

  type Token {
    token: String!
  }

  type Mutation {
    createUser(name: String, email: String, password: String, todos: [ID!]): User!
    deleteUser(id: ID!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    signUp(name: String!, email: String!, password: String!): Token!
  }
`;