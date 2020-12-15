import mongoose, { Schema } from 'mongoose'

const logSchema: Schema = new Schema({
  method: {
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Schema.Types.Mixed,
    required: true
  }
})

export class LogModel extends mongoose.model('Log', logSchema, 'logger') {
  constructor(logData: Model.LogType) {
    super(logData)
  }
}
