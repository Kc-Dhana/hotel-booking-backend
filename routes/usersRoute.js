import express from "express";
import { loginUser, postUsers } from "../controllers/userControllers.js"
                                        //method import karanne mehema. (.js danna)

const usersRouter = express.Router()

usersRouter.post("/",postUsers)
usersRouter.post("/login",loginUser)

export default usersRouter; //export karanwa ethokta index.js eken 
                            //import kara ganna puluwan
                            //import karanna lesi. defult danne export karanna one only usersRouter nisa