import express from "express";
import getAllBookings, { createBooking, createBookingUsingCategory, createBulkBooking, deleteBooking, getAvailableRooms, getBookingsByStatusForCustomer, retriveBookingByDate, updateBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/',createBooking);
bookingRouter.get('/',getAllBookings);
bookingRouter.get("/available", getAvailableRooms);
bookingRouter.get('/customer-bookings', getBookingsByStatusForCustomer);
bookingRouter.post('/bulk', createBulkBooking);
bookingRouter.post('/filter-date',retriveBookingByDate)
bookingRouter.post('/create-by-category',createBookingUsingCategory)

bookingRouter.put('/update/:id', updateBooking);
bookingRouter.delete('/delete/:id', deleteBooking);



export default bookingRouter;