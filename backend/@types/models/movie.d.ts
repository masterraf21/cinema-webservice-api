import { Document, ObjectId } from 'mongoose'
declare global {
  namespace Model {
    interface MovieType {
      title?: string | ParsedQS
      director?: string | ParsedQS
      rating?: number
      summary?: string
    }

    interface IMovie extends Document {
      _id?: ObjectId
      title?: string
      director?: string
      rating?: number
      summary?: string
    }
  }
}

export {}
