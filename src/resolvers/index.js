import { GraphQLDateTime } from 'graphql-iso-date';

import movieResolvers from './movie';
import tagResolvers from './tag';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [customScalarResolver, userResolvers, tagResolvers, movieResolvers];
