import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    tags: [Tag!]
    #tag: Tag!
  }

  extend type Mutation {
    createTag(name: String!): Tag!
    deleteTag(id: ID!): Boolean!
  }

  type Tag {
    id: ID!
    name: String!
  }
`;
