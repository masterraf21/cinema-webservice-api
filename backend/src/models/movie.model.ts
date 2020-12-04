import mongoose, { Schema } from 'mongoose'

const movieSchema: Schema = new Schema(
  {
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
      required: true,
      min: 0.0,
      max: 5.0
    },
    summary: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

// export default mongoose.model<Model.IMovie>('Movie', movieSchema, 'movies')
export class MovieModel extends mongoose.model('Movie', movieSchema, 'movies') {
  constructor(movieData: Model.MovieType) {
    super(movieData)
  }
}
