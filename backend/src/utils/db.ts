// import { ConnectOptions, connect, createConnection } from 'mongoose'
import mongoose from 'mongoose'
// import { createConnection } from 'net'
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

import { getEnv } from '../config'

const envVar: Config.ProcessEnv = getEnv()

/** Create connection to MongoDB with mongoose */
export const connectDB = async () => {
  try {
    const connection = await mongoose.createConnection(envVar.DATABASE!, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    await mongoose.connect(envVar.DATABASE!, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('MongoDB Connected')
    console.log(`Connection state: ${connection.readyState}`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

export function closeDB(): void {
  mongoose.connection.close()
}
