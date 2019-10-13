import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  posterPath: { type: String },
  description: { type: String },
  voteAverage: { type: Number }, // out of 10
  releaseDate: { type: String }, // TODO: dateEx: 2014-10-24
  runtime: { type: Number },
  tags: { type: [mongoose.Schema.Types.ObjectId], ref: 'Tag', default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  // TODO: movie details
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
