declare global {
  namespace Config {
    interface ProcessEnv {
      PORT: string | undefined
      DATABASE: string | undefined
      SECRET: string | undefined
      TOKEN_DURATION: number | string | undefined
      GITHUB_CLIENT_ID: string | undefined
      GITHUB_SECRET: string | undefined
      GITHUB_CALLBACK_URL: string | undefined
    }
  }
}

export {}
