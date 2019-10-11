import { GraphQlDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import movieResolvers from './movie';

const customScalarResolver = {
  Date: GraphQlDateTime
};

export default [userResolvers, movieResolvers];
