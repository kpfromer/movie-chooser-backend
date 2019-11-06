import { combineResolvers } from 'graphql-resolvers';
import moment from 'moment';
import { searchMovie } from '../api/movie';

import { isAuthenticated, isMovieOwner, isAdmin } from './authorization';

export default {
  Query: {
    movies: async (parent, args, { models }) => {
      const movies = await models.Movie.find();
      return movies.filter(movie => movie.watched === undefined || movie.watched === false);
    }
  },

  Mutation: {
    createMovie: combineResolvers(isAuthenticated, async (parent, { title }, { models, me }) => {
      const searchedMovie = await searchMovie(title);

      if (searchMovie !== null) {
        const {
          title,
          posterPath,
          runtime,
          voteAverage,
          releaseDate: stringReleaseDate,
          overview: description,
          genres
        } = searchedMovie;
        const tagNames = genres.map(genre => genre.name);
        let tags = await models.Tag.find({ name: { $in: tagNames } });
        const createdTagNames = tags.map(tag => tag.name);

        const toBeCreated = tagNames.filter(name => !createdTagNames.includes(name)).map(name => ({ name }));
        if (toBeCreated.length > 0) {
          tags = [...tags, ...(await models.Tag.insertMany(toBeCreated))];
        }

        const releaseDate = moment(stringReleaseDate, 'YYYY-MM-DD').toISOString();
        return await models.Movie.create({
          title,
          posterPath,
          runtime,
          voteAverage,
          releaseDate,
          description,
          tags: tags.map(tag => tag.id),
          userId: me.id
        });
      } else {
        return await models.Movie.create({ title, userId: me.id });
      }
    }),
    addTagToMovie: combineResolvers(isAuthenticated, async (parent, { movieId, tagId }, { models }) => {
      const movie = await models.Movie.findByIdAndUpdate(movieId, { $push: { tags: tagId } });

      return movie;
    }),
    deleteMovie: combineResolvers(isAuthenticated, isMovieOwner, async (parent, { id }, { models }) => {
      const movie = await models.Movie.findById(id);

      if (!!movie) {
        await movie.remove();
        return true;
      }
      return false;
    }),
    watchMovie: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
      const movie = await models.Movie.findByIdAndUpdate(id, { $set: { watched: true } });
      return !!movie;
    })
  },

  Movie: {
    user: async (movie, args, { loaders }) => {
      return await loaders.user.load(movie.userId);
    },
    tags: async (movie, args, { models }) => {
      return await models.Tag.find({ _id: { $in: movie.tags } });
    }
  }
};
