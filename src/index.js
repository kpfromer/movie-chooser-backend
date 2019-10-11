import cors from 'cors';
import express from 'express';
import DataLoader from 'dataloader';
import jwt from 'jsonwebtoken';

import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { config } from './config';
import loaders from './loaders';
import models, { connectDb } from './models';
import resolvers from './resolvers';
import schema from './schema';

const app = express();

app.use(cors());

const getMe = async req => {
  const token = req.headers['authorization'];

  if (!!token) {
    try {
      return await jwt.verify(token, config.get('auth.secret'));
    } catch (error) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

// TODO: errors
const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      };
    }
  }
});
server.applyMiddleware({ app, path: '/graphql' });

connectDb().then(() => {
  app.listen(config.get('port'), () => {
    console.log(`Apollo Server on http://localhost:${config.get('port')}/graphql`);
  });
});
