import { ObjectID } from 'mongodb'
import { Document } from 'mongoose'
declare global {
  namespace Model {
    interface MovieType {
      title: string
      director: string
      rating: number
      summary: string
    }

    interface IMovie extends Document {
      _id?: ObjectID
      title?: string
      director?: string
      rating?: number
      summary?: string
    }
  }
}

export {}
