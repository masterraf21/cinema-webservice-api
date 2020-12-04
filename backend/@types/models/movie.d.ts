import { Document } from 'mongoose'
declare global {
  namespace Model {
    interface MovieType {
      title: string
      director: string
      rating: number
    }

    interface IMovie extends Document {
      title?: string
      director?: string
      rating?: number
    }
  }
}

export {}
