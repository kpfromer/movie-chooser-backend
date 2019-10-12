import { gql } from 'apollo-server-express';

import movieSchema from './movie';
import tagSchema from './tag';
import userSchema from './user';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, tagSchema, movieSchema];
