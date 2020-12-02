declare global {
  namespace Config {
    interface ProcessEnv {
      PORT: string | undefined
      DATABASE: string | undefined
    }
  }
}

export {}
