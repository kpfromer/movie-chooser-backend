import convict from 'convict';

export const config = convict({
  port: { env: 'PORT', default: 3001 },
  mongo: {
    env: 'MONGO_URI',
    uri: { default: 'mongodb://localhost:27017/movie-chooser-graphql' }
  },
  auth: { secret: { default: 'jwt-secret' } }
});
