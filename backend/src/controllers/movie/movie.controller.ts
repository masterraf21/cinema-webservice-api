import { Request, Response } from 'express'
import { badRequest, internalServerError, notFoundError } from '../../errors'
import { MovieModel } from '../../models'
import mongoose from 'mongoose'

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

async function getMoviebyId(req: Request, res: Response) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return badRequest('ObjectId Not valid', res)
    }
    const id = mongoose.Types.ObjectId(req.params.id)
    const movie: Model.IMovie | null = await MovieModel.findById(id).exec()
    if (!movie) {
      return notFoundError('Movie', res)
    }

    res.status(200).json({
      message: `Movie found for id: ${id}`,
      movie
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

async function deleteMoviebyId(req: Request, res: Response) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return badRequest('ObjectId Not valid', res)
    }
    const id = mongoose.Types.ObjectId(req.params.id)
    const movie: Model.IMovie | null = await MovieModel.findById(id).exec()
    if (!movie) {
      return notFoundError('Movie', res)
    }
    await movie.remove()
    res.status(200).json({
      message: 'Movie deleted',
      movie: {
        _id: movie._id,
        title: movie.title
      }
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

// Available query: Title, Director.
async function searchMovieQuery(req: Request, res: Response) {
  try {
    if (req.query.title || req.query.director) {
      if (req.query.title && req.query.director) {
        const movies: Model.IMovie[] = await MovieModel.find({
          title: req.query.title,
          director: req.query.director
        })
        if (!movies.length) {
          return notFoundError('Movies', res)
        }
        res.status(200).json({
          message: 'Movies found',
          length: movies.length,
          movies
        })
      } else if (req.query.title) {
        const movies: Model.IMovie[] = await MovieModel.find({
          title: req.query.title
        })
        if (!movies.length) {
          return notFoundError('Movies', res)
        }

        res.status(200).json({
          message: 'Movies found',
          length: movies.length,
          movies
        })
      } else if (req.query.director) {
        const movies: Model.IMovie[] = await MovieModel.find({
          director: req.query.director
        })
        if (!movies.length) {
          return notFoundError('Movies', res)
        }

        res.status(200).json({
          message: 'Movies found',
          length: movies.length,
          movies
        })
      }
    } else {
      badRequest('At least need one query param', res)
    }
  } catch (error) {
    internalServerError(error, res)
  }
}
export { createMovie, getAllMovie, getMoviebyId, deleteMoviebyId, searchMovieQuery }
