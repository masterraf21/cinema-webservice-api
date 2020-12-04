declare global {
  namespace Config {
    interface ProcessEnv {
      PORT: string | undefined
      DATABASE: string | undefined
      SECRET: string | undefined
    }
  }
}

export {}
