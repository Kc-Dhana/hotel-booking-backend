import mongoose, { Mongoose } from "mongoose";


const roomSchema =mongoose.Schema({
    roomId : {
        type : Number,
        required : true,
        unique : true
    },
    category : {             //not relational like sql when woerking with mongofb
        type : String,
        required : true
    },
    maxGuests : {
        type : Number,
        required : true,
        default:3
    },
    available : {
        type : Boolean,
        required : true,
        default : true
    },
    photos :[
        {
            type : String     
        }
    ],
    specialdescription : {
        type : String,
        default:""
    },
    notes : {
        type : String,                  //passe mona hari chage unoth meka wenas kara ganna punwan nisa developeta lesi wenna
        default:""
    },
    price: {
        type: Number,
        required: true,
    }
})

const Room =mongoose.model("Rooms",roomSchema)

export default Room;