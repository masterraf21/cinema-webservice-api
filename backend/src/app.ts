import express, { Request, Response } from 'express'
import { connectDB } from './utils'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import movieRoutes from './routes/movie.routes'
// create exporess APP
const app = express()

//? connect to DB
connectDB()

//? Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

//? Routes
app.use('/api', movieRoutes)
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'The friend im dreaming of is far away, and doesnt feel my love'
  })
})

export default app
