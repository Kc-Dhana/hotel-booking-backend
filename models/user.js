import mongoose from "mongoose"

const userSchema =mongoose.Schema( //userge stucter eka
    {
        email :{
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        type :{                 //customer or admin
            type : String,
            required : true,
            default : "customer"
        },
        whatsApp : {
            type : String,
            required : true
        },
        phone : {
            type : String,
            required : true
        },
        disabled : {                //block user ekata
            type : Boolean,
            required : true,
            default : false
        },
        emailVerified : {
            type : Boolean,
            required : true,
            default : false
        },
        image : {
            type : String,
            //required : true
        }

    }
)

const User =mongoose.model("users",userSchema) //model eka mona collection ekeda save wenna one db eke
                                                        
export default User ;//User witahrk export karana nisa defult danne