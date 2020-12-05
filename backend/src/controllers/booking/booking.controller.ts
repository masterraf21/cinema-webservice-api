import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { badRequest, internalServerError, notFoundError } from '../../errors'
import { BookingModel } from '../../models/booking.model'

async function getAllBookings(req: Request, res: Response) {
  try {
    const bookings: Model.IBooking[] | null = await BookingModel.find()
      .populate('user showtimes movie')
      .exec()
    if (!bookings.length) {
      return notFoundError('Bookings', res)
    }
    res.status(200).json({
      message: 'Bookings found',
      length: bookings
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

async function createBooking(req: Request, res: Response) {
  if (req.body.user && req.body.showtime && req.body.movie) {
    try {
      const booking: Model.IBooking = new BookingModel(req.body)
      await booking.save()
      res.status(201).json({
        message: 'Booking created',
        booking: {
          _id: booking._id
        }
      })
    } catch (error) {
      internalServerError(error, res)
    }
  } else {
    badRequest('Required body not found', res)
  }
}
async function getBookingbyId(req: Request, res: Response) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return badRequest('ObjectId not valid', res)
    }
    const id = mongoose.Types.ObjectId(req.params.Id)
    const booking: Model.IBooking | null = await BookingModel.findById(id)
      .populate('user showtimes movie')
      .exec()
    if (!booking) {
      return notFoundError('Booking', res)
    }
    res.status(200).json({
      message: `Booking found for id: ${id}`,
      booking
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

async function searchBokingQuery(req: Request, res: Response) {
  try {
    if (req.query.user || req.query.showtime || req.query.movie) {
      let query: Model.BookingType
      if (req.query.user && req.query.showtime && req.query.movie) {
        query = {
          user: req.query.user,
          showtime: req.query.showtime,
          movie: req.query.movie
        }
      } else if (req.query.user && req.query.showtime) {
        query = {
          user: req.query.user,
          showtime: req.query.showtime
        }
      } else if (req.query.user && req.query.movie) {
        query = {
          user: req.query.user,
          movie: req.query.movie
        }
      } else if (req.query.movie && req.query.showtime) {
        query = {
          movie: req.query.movie,
          showtime: req.query.shotime
        }
      } else if (req.query.user) {
        query = {
          user: req.query
        }
      } else if (req.query.movie) {
        query = {
          movie: req.query.movie
        }
      } else if (req.query.showtime) {
        query = {
          showtime: req.query.showtime
        }
      }

      const bookings: Model.IBooking[] = await BookingModel.find(query!).populate(
        'user movie showtime'
      )
      if (!bookings.length) {
        return notFoundError('Bookings', res)
      }
      res.status(200).json({
        message: 'Bookings found',
        length: bookings.length,
        bookings
      })
    } else {
      badRequest('At least need one query param', res)
    }
  } catch (error) {
    internalServerError(error, res)
  }
}
export { getAllBookings, getBookingbyId, createBooking, searchBokingQuery }
