import { gql } from 'apollo-server';

export default gql`
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
    deleteUser(id: ID!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    signUp(name: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
  }
`;