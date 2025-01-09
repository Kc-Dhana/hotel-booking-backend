import express from "express";
import getAllBookings, { createBooking, retriveBookingByDate } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/',createBooking);
bookingRouter.get('/',getAllBookings);
bookingRouter.post('/filter-date',retriveBookingByDate)


export default bookingRouter;