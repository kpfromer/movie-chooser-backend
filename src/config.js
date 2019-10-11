import convict from 'convict';

export const config = convict({
  port: {
    env: 'PORT',
    default: 3000
  },
  mongo: {
    uri: {
      default: 'mongodb://localhost:27017/movie-chooser-graphql'
    }
  },
  auth: {
    secret: {
      default: 'jwt-secret'
    }
  }
});
