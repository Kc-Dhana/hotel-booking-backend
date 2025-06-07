import Booking from "../models/booking.js";
import Room from "../models/room.js";
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
               roomId : req.body.roomId,
               email : req.user.email,
               start : req.body.start,
               end : req.body.end
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
    const start = req.body.start;
    const end = req.body.end;
    console.log(start);
    console.log(end);

    Booking.find({      //db operation
        start:{         //gte greater than or equal
            $gte : new Date(start), //starting date ekata wada wadi wenna one(req(fronend)eka dec o1 and data shoud 1 or 2 like wise)
        },
        end : {         //lte less than or equal
            $lte : new Date(end)  //end date ekata wada adu wenna one(req dec 31 and data shoud 31 or 30 like that)
        }
    }).then(
        (result) => {
           res.json({
               message : "Filtered bookings",
               result : result
           });
        }
    ).catch((err) => {
            res.json({
                message : "Failed to get Filtered bookings",
                error : err
            });
        }
    )
}

export function createBookingUsingCategory(req,res){
 
    const start = new Date(req.body.start);    //req eke tiyena stardate eka new start variable ekaka (date) vidiyata ganna
    const end = new Date(req.body.end);

    Booking.find({
        $or :[        //condition 2k danawa. 2ken 1k hari giyath booked room ekka viyata ganne
            {
            start : {  //database eke start eka
                $gte :start,               //cutomer dena eka //starting data eke kalin booking wala staring and end date atahra tiyenwada balanwa.
                $lt :end                   //2ken 1k hari giyath booked room ekka viyata ganne
                }
            },
            { 
            end : {
                $gte :start,
                $lt :end
                }
            }
        ]
    }).then((response)=>{
      const overlappingBookings = response;
      const rooms = [];

      for(let i=0; i<overlappingBookings.length; i++){ //ovverlap wena bookings ganwa me loop eka run wenwa . ekin eka
        
        rooms.push(overlappingBookings[i].roomId);   //overlapping booking eke roomId eka push karnwa rooms ekata arrya ekka vidiyata //book wela tiyana room id thama enne
      }      

      Room.find({                                //Room model eka import  karanna mulinma
        roomId : {                                              
            $in: rooms                            //rooms array eke(bookedroomid) nathi ithuru rooom id ganna vidiya
        },
        category : req.body.category              //e ena room id eken awashana categorye eke ewa vitharl filter karanwa 
      }).then((room)=>{

       if(room.length === 0){   
        res.json({
            message : "No rooms available",
        });
       }else{
        const startingId = 1200; //auto genarate wena id eka 1000 patan ganna one nisa 

        Booking.countDocuments({}).then(
            (count) => {
               console.log(count);
               const newId = startingId + count + 1;      //count eka(db eke recodes count) + karala startingId eka passe eka ganna new id ekata
               const newBooking = new Booking({
                   bookingId : newId,
                   roomId : room[0].roomId,             //filter wela apu mulma room eka ta thama booking eka vatenne
                   email : req.user.email,
                   start :start,                //date kalin variable ekata gatta nisa aye req eken ganne na direct variable eka gannwa
                   end : end
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

      })                         
    })
}

// Controller function to get available rooms based on date range and category
export async function getAvailableRooms(req, res) {
  try {
    // Extract search parameters from the query string
    const { start, end, category } = req.query;

    // Convert string dates to Date objects
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Find bookings that overlap with the given date range
    // Overlap logic: a booking starts before the search end and ends after the search start
    const overlappingBookings = await Booking.find({
      $or: [
        {
          start: { $lt: endDate },
          end: { $gt: startDate },
        },
      ],
    });

    // Extract the room IDs from overlapping bookings
    const bookedRoomIds = overlappingBookings.map(b => b.roomId);

    // Find rooms that are NOT in the list of booked room IDs and match the selected category
    const availableRooms = await Room.find({
      roomId: { $nin: bookedRoomIds }, // Exclude booked rooms
      category: category,              // Match the selected category
    });

    // Send available rooms back to the client
    res.json(availableRooms);
  } catch (err) {
    // Handle any errors and send error response
    res.status(500).json({
      message: "Error fetching available rooms",
      error: err.message
    });
  }
}
export function createBulkBooking(req, res) {
  // Check if the customer/requester is authorized/valid
  if (!isCustomerValid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return; // stop further execution if not valid
  }

  const startingId = 1200; // base number for bookingId generation
  const { roomIds, start, end } = req.body; // destructure input data from request body

  // Validate input: roomIds must be an array with items, and start/end dates must exist
  if (!roomIds || !Array.isArray(roomIds) || roomIds.length === 0 || !start || !end) {
    return res.status(400).json({
      message: "Invalid input: roomIds, start and end are required",
    });
  }

  // Count existing bookings to generate unique booking IDs
  Booking.countDocuments({})
    .then((count) => {
      // Create a new Booking object for each roomId with unique bookingId
      const bookingsToCreate = roomIds.map((roomId, index) => {
        return new Booking({
          bookingId: startingId + count + index + 1, // generate unique ID for each booking
          roomId,
          email: req.user.email, // associate booking with current user's email
          start,
          end,
        });
      });

      // Save all new bookings in parallel using Promise.all
      return Promise.all(bookingsToCreate.map((booking) => booking.save()));
    })
    .then((results) => {
      // On success, return all created bookings
      res.json({
        message: "Bulk booking created successfully",
        results,
      });
    })
    .catch((err) => {
      // Handle errors and respond with 500 status
      res.status(500).json({
        message: "Booking creation failed",
        error: err,
      });
    });
}
export function getBookingsByStatusForCustomer(req, res) {
  if (!isCustomerValid(req)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const customerEmail = req.user.email; // from decoded JWT

  // Optional query parameter to filter by status
  const { status } = req.query;

  // Build query
  const query = { email: customerEmail };
  if (status) {
    query.status = status;
  }

  Booking.find(query)
    .then((result) => {
      res.json({
        message: "Bookings retrieved successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching bookings",
        error: err,
      });
    });
}

