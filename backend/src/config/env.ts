import dotenv from 'dotenv'
dotenv.config()

export function getEnv(): Config.ProcessEnv {
  const env: Config.ProcessEnv = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    SECRET: process.env.SECRET
  }

  return env
}
