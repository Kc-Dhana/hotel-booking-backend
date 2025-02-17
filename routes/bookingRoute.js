import express from "express";
import getAllBookings, { createBooking, createBookingUsingCategory, retriveBookingByDate } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/',createBooking);
bookingRouter.get('/',getAllBookings);
bookingRouter.post('/filter-date',retriveBookingByDate)
bookingRouter.post('/create-by-category',createBookingUsingCategory)


export default bookingRouter;