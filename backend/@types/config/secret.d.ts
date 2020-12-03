declare global {
  namespace Config {
    interface Secret {
      secretString: string
      salt: number
    }
  }
}

export {}
