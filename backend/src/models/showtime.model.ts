import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const showtimeSchema: Schema = new Schema({
  date: {
    type: Date,
    required: true
  },
  movies: [
    {
      type: ObjectId,
      ref: 'Movie'
    }
  ]
})

export default mongoose.model<Model.IShowtime>('Showtime', showtimeSchema, 'showtimes')
