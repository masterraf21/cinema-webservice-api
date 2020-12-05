import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const bookingSchema: Schema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  showtimes: {
    type: ObjectId,
    ref: 'Showtime',
    required: true
  },
  movie: {
    type: ObjectId,
    ref: 'Movie',
    required: true
  }
})

export class BookingModel extends mongoose.model('Booking', bookingSchema, 'bookings') {
  constructor(bookingData: Model.BookingType) {
    super(bookingData)
  }
}
