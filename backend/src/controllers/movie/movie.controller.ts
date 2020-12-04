import { Request, Response } from 'express'
import { badRequest, internalServerError, notFoundError } from '../../errors'
import { MovieModel } from '../../models'

async function createMovie(req: Request, res: Response) {
  if (req.body.title && req.body.director && req.body.rating && req.body.summary) {
    try {
      const movie: Model.IMovie = new MovieModel(req.body)
      await movie.save()
      res.status(201).json({
        message: 'Movie Created',
        movie: {
          title: movie.title,
          _id: movie._id
        }
      })
    } catch (error) {
      internalServerError(error, res)
    }
  } else {
    badRequest('Required body not found', res)
  }
}

async function getAllMovie(req: Request, res: Response) {
  const movies: Model.IMovie[] = await MovieModel.find().exec()
  if (!movies.length) {
    return notFoundError('Movies', res)
  }

  res.status(200).json({
    message: 'Movies found',
    length: movies.length,
    movies
  })
}
export { createMovie, getAllMovie }
