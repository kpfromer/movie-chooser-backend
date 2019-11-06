import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(username: String!, firstName: String!, lastName: String!, password: String!): Login!

    signIn(login: String!, password: String!): Login!
    # updateUser(username: String!): User!
    # deleteUser(id: ID!): Boolean!
  }

  type Login {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    role: String
    movies: [Movie!]
  }
`;
