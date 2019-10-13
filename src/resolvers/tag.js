import { combineResolvers } from 'graphql-resolvers';

import { isAdmin, isAuthenticated } from './authorization';

export default {
  Query: {
    tags: async (parent, args, { models }) => {
      const tags = await models.Tag.find();

      return tags;
    }
  },

  Mutation: {
    createTag: combineResolvers(isAuthenticated, async (parent, { name }, { models }) => {
      const tag = await models.Tag.create({ name });

      return tag;
    }),
    deleteTag: combineResolvers(isAuthenticated, isAdmin, async (parent, { id }, { models }) => {
      const tag = await models.Tag.findById(id);

      if (!!tag) {
        await tag.remove();
        return true;
      }
      return false;
    })
  }
};
