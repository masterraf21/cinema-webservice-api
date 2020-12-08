import express, { Request, Response } from 'express'
import passport from 'passport'
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
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())

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
