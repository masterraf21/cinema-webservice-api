import { Router } from 'express'
import * as controller from '../controllers/booking/booking.controller'
const bookingRoutes = Router()

bookingRoutes.get('/bookings', [], controller.getAllBookings)
bookingRoutes.post('/bookings', [], controller.createBooking)
bookingRoutes.get('/bookings/:id', [], controller.getBookingbyId)
bookingRoutes.get('/bookings/query/p', [], controller.searchBokingQuery)

export default bookingRoutes
