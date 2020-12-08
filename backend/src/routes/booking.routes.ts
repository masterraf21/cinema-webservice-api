import { Router } from 'express'
import * as controller from '../controllers/booking/booking.controller'
import { isAdmin, verifyToken } from '../middlewares'
const bookingRoutes = Router()

bookingRoutes.get('/bookings', [verifyToken, isAdmin], controller.getAllBookings)
bookingRoutes.post('/bookings', [verifyToken], controller.createBooking)
bookingRoutes.get('/bookings/:id', [verifyToken, isAdmin], controller.getBookingbyId)
bookingRoutes.get('/bookings/query/p', [verifyToken, isAdmin], controller.searchBokingQuery)

export default bookingRoutes
