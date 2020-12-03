import { Document, ObjectId, Types } from 'mongoose'

declare global {
  namespace Model {
    interface IMovie extends Document {
      title?: string
      director?: string
      rating?: number
    }

    interface IShowtime extends Document {
      date?: Date
      movies?: Types.Array<ObjectId>
    }

    interface IUser extends Document {
      username?: string
      encry_password?: string
      email?: string
      full_name?: string
      salt: string
      authenticate?: (plain_password: string) => string
      hash_password?: (plain_password: string) => string
    }
  }
}

export {}
