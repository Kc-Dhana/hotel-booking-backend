import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req,res){

    if (!isCustomerValid(req)) {
        res.status(403).json({
          message: "Forbidden",
        });
        return;
      }

    const startingId = 1200; //auto genarate wena id eka 1000 patan ganna one nisa 

    Booking.countDocuments({}).then(
        (count) => {
           console.log(count);
           const newId = startingId + count + 1;      //count eka(db eke recodes count) + karala startingId eka passe eka ganna new id ekata
           const newBooking = new Booking({
               bookingId : newId,
               roomId : req.body.roomID,
               email : req.user.email,
               start : req.body.startDate,
               end : req.body.endDate
           });
           newBooking.save().then(
               (result) => {
                   res.json({
                       message : "Booking created successfully",
                       result : result
                   });
               }
           ).catch(
               (err) => {
                   res.json({
                       message : "Booking creation failed",
                       error : err
                   });
               }
           );
        }
    ).catch(
        (err) => {  
            res.json({
                message : "Booking creation failed",
                error : err
            })
        }
    )

}
export default function getAllBookings(req,res){
    Booking.find().then(
        (result) => {
            res.json({
                message : "Bookings found",
                result : result
            });
        }
    ).catch(
        (err) => {
            res.json({
                message : "Failed to get bookings",
                error : err
            });
        }
    )
}

//post req ekka create karanne json data dala yawanana one nisa
export function retriveBookingByDate(req,res){
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    console.log(startDate);
    console.log(endDate);
}