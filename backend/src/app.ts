import express, { Request, Response } from 'express'
import { connectDB } from './utils'
import cors from 'cors'

// create exporess APP
const app = express()

// connect to DB
connectDB()
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'Hello miss you salsa',
  })
})

export default app
