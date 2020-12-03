import { Document } from 'mongoose'
declare global {
  namespace Model {
    interface UserType {
      username: string
      password: string
      full_name: string
      email: string
    }

    interface IUser extends Document {
      username?: string
      encrypted_password?: string
      email?: string
      full_name?: string
      salt?: string
      authenticate?: (plain_password: string) => boolean
      hashPassword?: (plain_password: string) => string
    }
  }
}

export {}
