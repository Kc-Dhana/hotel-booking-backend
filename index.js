import express from 'express'
import bodyParser from 'body-parser'
import usersRouter from './routes/usersRoute.js' //import karanwa
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryItemRoute.js'
import jwt from 'jsonwebtoken'
import categoryRouter from './routes/category.Route.js'
import dotenv from 'dotenv'

dotenv.config()


const app = express()

app.use(bodyParser.json())

const connectionString = process.env.MONGO_URL;

//midelware karanne req kohen hari enawa nam e req eka aran mona hari wenasak karala processing ekak karala elaga kenwata yawanwa

app.use((req,res,next)=>{                                               // Authentication middelwere ekak(bodypaser wage but meka api hadanne)

    const token = req.header("Authorization")?.replace("Bearer ", "")   //ena token eka save karagannwa, token eka enne req header ekem
                                                                        //req.header("Authorization")req heder eke,autherixation eke monama hari 
                                                                        //tiyenwadaw check karawa
                                                                        //? tiyenwa nam bearer eke tiyene eka token variable ekata aran denewa
  
    if(token != null){                          //token tiyena ekak da kiyala balanwa
      jwt.verify(token,process.env.JWT_KEY,                //secret passs + token dala balnwa verfiwenawa nam pahala functioneka run wenna one
        (err,decoded)=>{                        //decode karaddi error awada, nattma decode unada kiyala balanwa
        if(decoded != null){                    //decode una nam
          req.user = decoded                    //req usewa dala yawanwa. next req ekat(userwa gatte apu token eka decode karala)
          next()
        }else{                                  //error awoth
          next()
        }
  
      }
    )
    }else{
      next()
    }
  
  });

mongoose.connect(connectionString).then(     //use mogoose to connect db.
    ()=>{
        console.log("Connected to the databse")
    }
).catch(
    ()=>(
        console.log("Connection failed")
    )
)

app.use("/api/users",usersRouter)           //userRouter.js eke routes tika use karanwa "/users" dala.use api for best paratice,req eketh(postman)add weenna one api kiyala
                              
app.use("/api/gallery",galleryItemRouter)

app.use("/api/category",categoryRouter)



app.listen(5000,(req,res)=>{
 console.log("Sever is running on port 5000")
});