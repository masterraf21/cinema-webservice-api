import { ConnectOptions, connect, createConnection } from 'mongoose'

import { getEnv } from '../config'

const envVar: Config.ProcessEnv = getEnv()

/** Create connection to MongoDB with mongoose */
export const connectDB = async () => {
  try {
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoCreate: true,
      useCreateIndex: true
    }
    const connection = await createConnection(envVar.DATABASE!, options)
    await connect(envVar.DATABASE!, options)
    console.log('MongoDB Connected')
    console.log(`Connection state: ${connection.readyState}`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
