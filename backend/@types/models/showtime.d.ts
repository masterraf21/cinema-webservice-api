import { Document, ObjectId } from 'mongoose'
declare global {
  namespace Model {
    interface ShowtimeType {
      date: Date
      movies?: ObjectId[] | string[]
    }

    interface IShowtime extends Document {
      _id?: ObjectID
      date?: Date
      movies?: Model.IMovie[] | null
    }
  }
}

export {}
