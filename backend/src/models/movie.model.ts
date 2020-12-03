import mongoose, { Schema } from 'mongoose'

const movieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
})

export default mongoose.model<Model.IMovie>('Movie', movieSchema, 'movies')
