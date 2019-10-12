import { GraphQlDateTime } from 'graphql-iso-date';

import movieResolvers from './movie';
import tagResolvers from './tag';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQlDateTime
};

export default [userResolvers, tagResolvers, movieResolvers];
