import dotenv from 'dotenv'
dotenv.config()

export function getEnv(): Config.ProcessEnv {
  const env: Config.ProcessEnv = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    TOKEN_DURATION: process.env.TOKEN_DURATION,
    SECRET: process.env.SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL
  }

  return env
}
