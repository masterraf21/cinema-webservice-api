import { Document, ObjectId } from 'mongoose'

declare global {
  namespace Model {
    interface LogType {
      method?: string
      endpoint?: string
      status?: number | undefined | any
    }

    interface ILog extends Document {
      _id?: ObjectId
      method?: string
      endpoint?: string
      status?: number
    }
  }
}
