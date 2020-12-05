import { Router } from 'express'
import * as controller from '../controllers/showtime/showtime.controller'
const showtimeRoutes = Router()

showtimeRoutes.get('/showtimes', [], controller.getAllShowtimes)
showtimeRoutes.post('/showtimes', [], controller.createShowtime)
showtimeRoutes.post('/showtimes/movie', [], controller.addMovietoShowtime)
showtimeRoutes.delete('/showtimes/:id', [], controller.deleteShowById)
showtimeRoutes.get('/showtimes', [], controller.getShowById)

export default showtimeRoutes
