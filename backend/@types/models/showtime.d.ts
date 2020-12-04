import { Document } from 'mongoose'
declare global {
  namespace Model {
    interface ShowtimeType {
      date: Date
      movies: Array<Model.IMovie | null>
    }

    interface IShowtime extends Document {
      date?: Date
      movies?: Array<Model.IMovie>
    }
  }
}

export {}
