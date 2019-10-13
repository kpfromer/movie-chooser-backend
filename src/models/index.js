import mongoose from 'mongoose';

import { config } from '../config';

import Movie from './movie';
import Tag from './tag';
import User from './user';

export const connectDb = async () => await mongoose.connect(config.get('mongo.uri'), { useNewUrlParser: true });

export default { Movie, User, Tag };
