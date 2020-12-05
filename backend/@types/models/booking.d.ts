import { ObjectID } from 'mongodb'
import { Document } from 'mongoose'
declare global {
  namespace Model {
    interface BookingType {
      user?: ObjectId | string | ParsedQS
      showtime?: ObjectId | string | ParsedQS
      movie?: ObjectId | string | ParsedQS
    }

    interface IBooking extends Document {
      _id?: ObjectID
      user?: Model.IUser
      showtime?: Model.IShowtime
      movie?: Model.IMovie
    }
  }
}

export {}
