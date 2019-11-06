import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  posterPath: { type: String },
  description: { type: String },
  voteAverage: { type: Number }, // out of 10
  releaseDate: { type: String },
  runtime: { type: Number },
  tags: { type: [mongoose.Schema.Types.ObjectId], ref: 'Tag', default: [] },
  weight: { type: Number, default: 0 },
  watched: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
