import convict from 'convict';

export const config = convict({
  port: { env: 'PORT', default: 3001 },
  mongo: {
    uri: { env: 'MONGO_URI', default: 'mongodb://localhost:27017/movie-chooser-graphql' }
  },
  auth: { secret: { default: 'jwt-secret' } },
  apiKey: { default: 'bad-api-key', env: 'API_KEY' }
});
