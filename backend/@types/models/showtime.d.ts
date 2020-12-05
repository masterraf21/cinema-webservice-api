import { ObjectID } from 'mongodb'
import { Document } from 'mongoose'
declare global {
  namespace Model {
    interface ShowtimeType {
      date: Date
      movies?: string[]
    }

    interface IShowtime extends Document {
      _id?: ObjectID
      date?: Date
      movies?: Model.IMovie[] | null
    }
  }
}

export {}
