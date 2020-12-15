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
      let query: Model.MovieType
      if (req.query.title && req.query.director) {
        query = {
          title: req.query.title,
          director: req.query.director
        }
      } else if (req.query.title) {
        query = {
          title: req.query.title
        }
      } else if (req.query.director) {
        query = {
          director: req.query.director
        }
      } else {
        query = {}
      }

      const movies: Model.IMovie[] = await MovieModel.find(query!)
      if (!movies.length) {
        return notFoundError('Movie', res)
      }
      res.status(200).json({
        message: 'Movies found',
        length: movies.length,
        movies
      })
    } else {
      badRequest('At least need one query param', res)
    }
  } catch (error) {
    internalServerError(error, res)
  }
}

async function editMovie(req: Request, res: Response) {
  try {
    if (req.body.id) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return badRequest('ObjectId Not valid', res)
      }
      let query: Model.MovieType
      if (req.body.title && req.body.director && req.body.rating && req.body.summary) {
        query = {
          title: req.body.title,
          director: req.body.director,
          rating: req.body.rating,
          summary: req.body.summary
        }
        const movie: Model.IMovie | null = await MovieModel.findByIdAndUpdate(req.body.id, query)
        if (!movie) {
          return notFoundError('Movie', res)
        }
        const newMovie: Model.IMovie | null = await MovieModel.findById(movie._id)
        res.status(200).json({
          message: 'Movie updated',
          movie: {
            id: newMovie?._id,
            title: newMovie?.title
          }
        })
      } else {
        badRequest('Required body not found', res)
      }
    } else {
      badRequest('Need id', res)
    }
  } catch (error) {
    internalServerError(error, res)
  }
}
export { createMovie, getAllMovie, getMoviebyId, deleteMoviebyId, searchMovieQuery, editMovie }
