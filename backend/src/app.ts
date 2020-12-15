import express, { Request, Response } from 'express'
import * as fs from 'fs'
import morgan from 'morgan'
import { connectDB } from './utils'
import cors from 'cors'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import movieRoutes from './routes/movie.routes'
import showtimeRoutes from './routes/showtime.routes'
import bookingRoutes from './routes/booking.routes'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// create exporess APP
const app = express()

//? connect to DB
connectDB()

//? Middlewares
app.use((req, res, next) => {
  next()
}, cors({ maxAge: 84600 }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./files/access.log', { flags: 'a' })
  })
)
app.use(express.static('./files'))
// app.use(morgan('dev'))

//? Routes
app.use('/api', movieRoutes)
app.use('/api', showtimeRoutes)
app.use('/api', bookingRoutes)
app.use('/api', userRoutes)
app.use('/api', authRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'The friend im dreaming of is far away, and doesnt feel my love'
  })
})

export default app
