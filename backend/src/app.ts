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
    message: 'The friend im dreaming of is far away, and doesnt feel my love'
  })
})

export default app
