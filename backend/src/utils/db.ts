import { ConnectOptions, connect, createConnection } from 'mongoose'
import { getEnv } from '../config'
const env_var: Config.ProcessEnv = getEnv()

export const connectDB = async () => {
  try {
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
    var connection = await createConnection(env_var.DATABASE!, options)
    await connect(env_var.DATABASE!, options)
    console.log('MongoDB Connected')
    console.log('Connection state: ' + connection.readyState)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
