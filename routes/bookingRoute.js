import express from "express";
import getAllBookings, { createBooking, createBookingUsingCategory, createBulkBooking, getAvailableRooms, retriveBookingByDate } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/',createBooking);
bookingRouter.get('/',getAllBookings);
bookingRouter.get("/available", getAvailableRooms);
bookingRouter.post('/bulk', createBulkBooking);
bookingRouter.post('/filter-date',retriveBookingByDate)
bookingRouter.post('/create-by-category',createBookingUsingCategory)



export default bookingRouter;