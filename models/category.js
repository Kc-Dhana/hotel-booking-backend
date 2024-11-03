import mongoose, { Mongoose } from "mongoose";

const categorySchema =mongoose.Schema(
    {
        name: {
            type : String,
            required :true,
            unique :true
        },
        price : {
            type : Number,
            required :true
        },
        features :[         //Strings array ekak vdiyata save wenwa. feature godak denna pulwaun..
            {
                type:String,
            }
        ],
        description: {
            type : String,
            required : true
        },
        Image :{
            type :String
        }
    
    }
)
const Category =mongoose.model("category",categorySchema)

export default Category;