import { Router } from 'express'
import * as controller from '../controllers/movie/movie.controller'
const movieRoutes = Router()

movieRoutes.get('/movies', [], controller.getAllMovie)
movieRoutes.post('/movies', [], controller.createMovie)
export default movieRoutes
