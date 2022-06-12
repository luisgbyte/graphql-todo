import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String
    todo: [Todo!] 
  }

  type Token {
    token: String!
  }

  type Mutation {
    deleteUser: Boolean!
    updateUser(name: String, email: String, password: String): User
    signUp(name: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
  }
`;