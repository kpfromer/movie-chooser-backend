import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { config } from '../config';
import bcryptjs from 'bcryptjs';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, { expiresIn });
};

export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.find(),
    user: async (parent, { id }, { models }) => await models.User.findById(id),
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findById(me.id);
    }
  },

  Mutation: {
    signIn: async (parent, { login, password }, { models }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError('No user found with this login credentials.');
      }

      console.log({ user });

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid login or password.');
      }

      return { token: createToken(user, config.get('auth.secret'), '30m') };
    },

    signUp: async (parent, { username, firstName, lastName, password }, { models }) => {
      const user = await models.User.create({
        username,
        firstName,
        lastName,
        password: await bcryptjs.hash(password, 10)
      });
      return { token: createToken(user, config.get('auth.secret'), '30m') };
    }

    // todo: updateUser, deleteUser, User
  },

  User: {
    movies: async (user, args, { models }) => {
      return await models.Movie.find({
        userId: user.id
      });
    }
  }
};