import dotenv from 'dotenv'
dotenv.config()

export function getEnv(): Config.ProcessEnv {
  let env: Config.ProcessEnv = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
  }

  return env
}