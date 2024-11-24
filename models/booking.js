import mongoose, { Mongoose } from "mongoose";

const bookingSchema =mongoose.Schema({
    bookingId : {
        type : Number,
        required : true,
        unique : true
    },
    roomID:{
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default: "pending"
    },
    reason : {
        type : String,
        default: ""
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    notes : {
        type : String,
        default: ""
    }

})

const Booking =mongoose.model("Booking",bookingSchema)

export default Booking;