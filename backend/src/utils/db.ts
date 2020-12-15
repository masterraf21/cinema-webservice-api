import mongoose from 'mongoose'
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

import { getEnv } from '../config'
import { LogModel } from '../models'

const envVar: Config.ProcessEnv = getEnv()

/** Create connection to MongoDB with mongoose */
export async function connectDB() {
  try {
    const connection = await mongoose.createConnection(envVar.DATABASE!, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('Connecting....')
    await mongoose.connect(envVar.DATABASE!, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log(`MongoDB Connected with connection state: ${connection.readyState}`)
  } catch (err) {
    console.error(err.message)
  }
}

export async function closeDB() {
  console.log('Closing......')
  await mongoose.connection.close()
  console.log('MongoDB Closed')
}

export async function writeLog(logData: Model.LogType) {
  const log: Model.ILog = new LogModel(logData)
  console.log('Saving....')
  await log.save()
  console.log('....Save')
}
