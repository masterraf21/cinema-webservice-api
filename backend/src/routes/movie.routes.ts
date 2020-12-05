import { Router } from 'express'
import * as controller from '../controllers/movie/movie.controller'
const movieRoutes = Router()

movieRoutes.get('/movies', [], controller.getAllMovie)
movieRoutes.post('/movies', [], controller.createMovie)
movieRoutes.get('/movies/:id', [], controller.getMoviebyId)
movieRoutes.get('/movies/query/p', [], controller.searchMovieQuery)
movieRoutes.delete('/movies/:id', [], controller.deleteMoviebyId)

export default movieRoutes
