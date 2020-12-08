import { verify } from 'crypto'
import { Router } from 'express'
import * as controller from '../controllers/showtime/showtime.controller'
import { isAdmin, verifyToken } from '../middlewares'
const showtimeRoutes = Router()

showtimeRoutes.get('/showtimes', [], controller.getAllShowtimes)
showtimeRoutes.post('/showtimes', [verifyToken, isAdmin], controller.createShowtime)
showtimeRoutes.post('/showtimes/movie', [verifyToken], controller.addMovietoShowtime)
showtimeRoutes.delete('/showtimes/:id', [verifyToken, isAdmin], controller.deleteShowById)
showtimeRoutes.get('/showtimes', [], controller.getShowById)

export default showtimeRoutes
