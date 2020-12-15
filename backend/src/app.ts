import express, { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import morgan from 'morgan'
import passport from 'passport'
import { connectDB } from './utils'
// import { saveLog } from './middlewares'
import cors from 'cors'
import { getEnv } from './config'
import * as swaggerUi from 'swagger-ui-express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const file = '../docs/swagger.json'
// const swaggerDoc = JSON.parse(file)
// const swaggerDoc = require('../docs/swagger.json')
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
// app.use(cors())
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
app.use(morgan('dev'))
// app.use(saveLog)
app.use(passport.initialize())

//? Routes
app.use('/api', movieRoutes)
app.use('/api', showtimeRoutes)
app.use('/api', bookingRoutes)
app.use('/api', userRoutes)
app.use('/api', authRoutes)
// app.use('/api', swaggerUi.serve)
// app.get('/api', swaggerUi.setup(swaggerDoc))

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'The friend im dreaming of is far away, and doesnt feel my love'
  })
})

export default app
