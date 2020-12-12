import { Document, ObjectId } from 'mongoose'
declare global {
  namespace Model {
    interface UserType {
      username?: string | ParsedQS
      password?: string | ParsedQS
      full_name?: string | ParsedQS
      email: string | ParsedQS
      role?: string | ParsedQS
    }

    interface IUser extends Document {
      _id?: ObjectId
      username?: string
      password?: string
      encrypted_password?: string
      email?: string
      full_name?: string
      salt?: string
      role?: string
      authenticate?: (plain_password: string) => boolean
      hashPassword?: (plain_password: string) => string
    }
  }
}

export {}
