import Movie from './movie';
import User from './user';
import mongoose from 'mongoose';
import { config } from '../config';

export const connectDb = async () => await mongoose.connect(config.get('mongo.uri'), { useNewUrlParser: true });

export default { Movie, User };
