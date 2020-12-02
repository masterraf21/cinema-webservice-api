export interface Env {
  port: number | undefined
  database: string | undefined
}

export interface ProcessEnv {
  [key: string]: string | undefined
}
