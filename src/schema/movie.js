import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    movies: [Movie!]
    # movie(id: ID!): Movie!
  }

  extend type Mutation {
    createMovie(title: String!): Movie!
    addTagToMovie(movieId: ID!, tagId: ID!): Movie!
    deleteMovie(id: ID!): Boolean!
  }

  type Movie {
    id: ID!
    title: String!
    # createAt: Date!
    tags: [Tag!]
    user: User!
  }
`;
