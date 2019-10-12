import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: [mongoose.Schema.Types.ObjectId], ref: 'Tag', default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  // TODO: movie details
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
