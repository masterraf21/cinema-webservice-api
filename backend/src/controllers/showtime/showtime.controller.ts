import { Request, Response } from 'express'
import { badRequest, internalServerError, notFoundError } from '../../errors'
import mongoose from 'mongoose'
import { MovieModel, ShowtimeModel } from '../../models'

async function getAllShowtimes(req: Request, res: Response) {
  try {
    const showtimes: Model.IShowtime[] = await ShowtimeModel.find().populate('movies').exec()
    if (!showtimes.length) {
      return notFoundError('Showtimes', res)
    }
    res.status(200).json({
      message: 'Showtimes found',
      length: showtimes.length,
      showtimes
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

async function getShowById(req: Request, res: Response) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return badRequest('ObjectId not valid', res)
    }
    const id = mongoose.Types.ObjectId(req.params.id)
    const showtime: Model.IShowtime | null = await ShowtimeModel.findById(id)
      .populate('movies')
      .exec()
    if (!showtime) {
      return notFoundError('Showtime', res)
    }
    res.status(200).json({
      message: `Showtime found for id: ${id}`,
      showtime
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

async function deleteShowById(req: Request, res: Response) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return badRequest('ObjectId not valid', res)
    }
    const id = mongoose.Types.ObjectId(req.params.id)
    const showtime: Model.IShowtime | null = await ShowtimeModel.findById(id).exec()
    if (!showtime) {
      return notFoundError('Showtime', res)
    }
    await showtime.remove()
    res.status(200).json({
      message: 'Showtime Deleted',
      showtime: {
        _id: showtime._id
      }
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

function validateObj(arr: any[]): boolean {
  let validated = true
  arr.forEach((_elm) => {
    if (!mongoose.Types.ObjectId.isValid(_elm)) {
      validated = false
    }
  })
  return validated
}

async function returnMovies(arr: string[]): Promise<(Model.IMovie | null)[]> {
  const promises = arr.map(async (_elm) => {
    const movie: Model.IMovie | null = await MovieModel.findById(_elm).exec()
    return movie
  })
  const result = await Promise.all(promises)
  return result
}

async function validateMovie(arr: string[]): Promise<boolean> {
  const movies = await returnMovies(arr)
  const other = !movies.includes(null)
  return other
}

function validateDate(date: Date): boolean {
  return date instanceof Date
}

async function createShowtime(req: Request, res: Response) {
  try {
    if (req.body.date) {
      if (!validateDate(req.body.date)) {
        return badRequest('Date not valid', res)
      }
      if (req.body.movies) {
        if (!(await validateMovie(req.body.movies))) {
          return badRequest('Movie ObjectId Not valid', res)
        }
        if (!returnMovies(req.body.movies)) {
          return notFoundError('Movie', res)
        }
      }
      const showtime: Model.IShowtime = new ShowtimeModel(req.body)
      await showtime.save()
      res.status(200).json({
        message: 'Showtime Created',
        _id: showtime._id
      })
    } else {
      badRequest('Required body not found', res)
    }
  } catch (error) {
    internalServerError(error, res)
  }
}
export {
  validateMovie,
  validateObj,
  getAllShowtimes,
  getShowById,
  deleteShowById,
  createShowtime,
  returnMovies
}
