import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

const userSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  encrypted_password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  salt: String,

  full_name: {
    type: String,
    required: true,
    trim: true
  }
})

userSchema.virtual('password').set(function (this: any, password: string) {
  this._password = password
  this.salt = uuidv4()
  this.encrypted_password = this.hash_password(password)
})

export default mongoose.model<Model.IUser>('User', userSchema, 'users')
