import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isMovieOwner } from './authorization';

export default {
  Query: {
    movies: async (parent, args, { models }) => {
      const movies = await models.Movie.find();

      return movies;
    }
  },

  Mutation: {
    createMovie: combineResolvers(isAuthenticated, async (parent, { title }, { models, me }) => {
      const movie = await models.Movie.create({
        title,
        userId: me.id
      });

      return movie;
    }),
    deleteMovie: combineResolvers(isAuthenticated, isMovieOwner, async (parent, { id }, { models }) => {
      const movie = await models.Movie.findById(id);

      if (!!movie) {
        await movie.remove();
        return true;
      }
      return false;
    })
  },

  Movie: {
    user: async (movie, args, { loaders }) => {
      return await loaders.user.load(movie.userId);
    }
  }
};