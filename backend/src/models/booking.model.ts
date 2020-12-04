import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const bookingSchema: Schema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  showtimes: {
    type: ObjectId,
    ref: 'Showtime'
  },
  movies: [
    {
      type: ObjectId,
      ref: 'Movie'
    }
  ]
})

export class BookingModel extends mongoose.model('Booking', bookingSchema, 'bookings') {
  constructor(bookingData: Model.BookingType) {
    super(bookingData)
  }
}
