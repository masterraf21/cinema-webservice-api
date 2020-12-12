import { Router } from 'express'
import * as controller from '../controllers/movie/movie.controller'
import { isAdmin, verifyToken } from '../middlewares'
const movieRoutes = Router()

movieRoutes.get('/movies', [], controller.getAllMovie)
movieRoutes.post('/movies', [verifyToken, isAdmin], controller.createMovie)
movieRoutes.get('/movies/:id', [], controller.getMoviebyId)
movieRoutes.get('/movies/query/p', [], controller.searchMovieQuery)
movieRoutes.delete('/movies/:id', [verifyToken, isAdmin], controller.deleteMoviebyId)
movieRoutes.patch('/movies', [verifyToken, isAdmin], controller.editMovie)

export default movieRoutes
