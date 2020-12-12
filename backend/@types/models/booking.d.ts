import { Document, ObjectId } from 'mongoose'
declare global {
  namespace Model {
    interface BookingType {
      user?: ObjectId | string | ParsedQS
      showtime?: ObjectId | string | ParsedQS
      movie?: ObjectId | string | ParsedQS
    }

    interface IBooking extends Document {
      _id?: ObjectId
      user?: Model.IUser
      showtime?: Model.IShowtime
      movie?: Model.IMovie
    }
  }
}

export {}
