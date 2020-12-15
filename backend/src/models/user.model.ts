import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
// import { use } from 'nconf'

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true
    },
    encrypted_password: {
      type: String
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
      required: true
    },
    full_name: {
      type: String,
      trim: true
    },
    salt: String
  },
  { timestamps: true }
)

userSchema
  .virtual('password')
  .set(function (this: any, password: string) {
    this._password = password
    this.salt = uuidv4()
    this.encrypted_password = this.hashPassword(password)
  })
  .get(function (this: any) {
    return this._password
  })

userSchema.method({
  authenticate: function (plain_password: string): boolean {
    return this.hashPassword(plain_password) === this.encrypted_password
  },

  hashPassword: function (plain_password: string): string {
    if (!plain_password) {
      return ''
    }
    return crypto.createHmac('sha256', this.salt).update(plain_password).digest('hex')
  }
})

export class UserModel extends mongoose.model('User', userSchema, 'users') {
  constructor(userData: Model.UserType) {
    super(userData)
  }
}
