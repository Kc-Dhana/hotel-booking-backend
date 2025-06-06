import User from "../models/user.js"
import jwt from 'jsonwebtoken' //jwt athuentication (token)
import bcrpty from  'bcrypt'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';       
import Otp from "../models/otp.js";
import e from "express";
dotenv.config()

//create user
export function postUsers(req,res){     //export danne me method eka wena file ekn import karanna.

    const user =req.body

    //hash password
    const password = req.body.password  //req eke ena pass eka gannwa
    const passwordHash =bcrpty.hashSync(password,10);  // e pass eka hash karala passwordHash variable kata dagannawa
    console.log(passwordHash)
    user.password = passwordHash //req userge passweka wenuwata Hash passeka danwa
    
    const newUser = new User(user) //ena data tiaka aragena new user kenek hadanna
    newUser.save().then(           //new userwa db eke save karanna

        ()=>{
            //generate random number 1000-9999
            const otp = Math.floor( 1000 + Math.random() * 9000);

            const newOtp = new Otp({
                email : req.body.email,
                otp : otp
            })
            newOtp.save().then(()=>{                           //otp eka save karanaw db eke
                    sendOtpEmail(user.email,otp);          //save unata passe email eka yawanwa
                    res.json({                                    //okkoma hari nam meh json eka yanwa
                        message : "User Created Succesfully"
                    });
                }
            )
        }
    ).catch(
        ()=>{
            res.json({
                message : "User creation failed"
            })
        }
    )
}
export function loginUser(req,res){

    const credentials = req.body   //req eke body eka credentials variable ekata gannwa

    User.findOne({email :credentials.email}).then(      //findOne kiyana filter eken db eke me apu detail walata 
        (user)=>{                                                                      //samana user innwada check karanwa
            if(user == null){   //user nattam pahala code run wenwa

                res.status(403).json({
                    message : "User not found"
                })

            }else{

                const passwordHash =bcrpty.compareSync(credentials.password, user.password)  //normal password eka hash pass ekata convert karala samanda balanwa

                if(!passwordHash){

                    res.status(403).json({
                        message : "Incorrect password",
                    });

                }else{

                const payload ={        //user inwa nam eyage deatail payload ekaekta daganna token eka hadanna.
                    id: user._id,           //(payload+secret password=token(meaning less words and numbers))
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                };

                // sign the token with the paylaid and secret
                const token =jwt.sign(payload,process.env.JWT_KEY,{ expiresIn: "48h"});

                res.json({
                    message : "User found",
                    user : user,                    //front end ekata user detauil and token eka yawanwa
                    token : token
                });
            }
        }
    });

}

export function isAdminValid(req) {     //same code use karanwa nam eka funtion ekek vidyata dala awasha thanadi call karanwa. coding standedards
    if(req.user == null){               
        return false
      }
    if(req.user.type != "admin"){
      
        return false
      }
      return true;
}
export function isCustomerValid(req) {     //same code use karanwa nam eka funtion ekek vidyata dala awasha thanadi call karanwa. coding standedards
    if(req.user == null){               
        return false
      }
    if(req.user.type != "customer"){
      
        return false
      }
      return true;
}
export function getUser(req,res){   
    const user = req.body.user;
    console.log(user);
    if(user == null){
       res.json({
           message : "not found"
       })
    }
    else{
        res.json({
            message : "found",
            user : user
        })
    }
    
}
export function getAllUsers(req, res) {
    // Validate admin
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Forbidden"
        });
        return;
    }

    // Get pagination parameters from request query
    const page = parseInt(req.body.page) || 1; // Default to page 1
    const pageSize = parseInt(req.body.pageSize) || 10; // Default to 10 users per page
    const skip = (page - 1) * pageSize; // Calculate number of documents to skip

    User.find()
        .skip(skip)
        .limit(pageSize)
        .then((users) => {
            // Count total users
            User.countDocuments().then((totalCount) => {
                res.json({
                    message: "Users found",
                    users: users,
                    pagination: {
                        currentPage: page,
                        pageSize: pageSize,
                        totalUsers: totalCount,
                        totalPages: Math.ceil(totalCount / pageSize),   //math.ceil kiyanne dashama sankayawak asanna uda agayata watayanwa (5.3=6)
                    },
                });
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error fetching users",
                error: err,
            });
        });
}

export function sendOtpEmail(email,otp){
    
                                                        //nodemailer ekai google account ekai connete karanne transporter eken

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,              //avilla tiyena email ekata thama yawanne
        subject: 'Validating OTP',
        text: 'Your OTP is: ' + otp
      };

      transporter.sendMail(mailOptions, function(error, info){            //meken thama mail eka send karanne
        if (error) {
          console.log(error);
        
        } else {
          console.log(info);
          
        }
      });
}
export function verifyUserEmail(req,res){
   
    const otp = req.body.otp;
    const email = req.body.email;

    Otp.find({email : email}).sort({date : -1}).then((otpList)=>{        //anithimata apu otp eka hoyanwa
        if(otpList.length == 0){          //otp list eke lenghth eka balanwa
            res.json({
                message : "OTP is invalid"
            });
        }else{
            const latestOtp = otpList[0];   //otp list eke otp eka ekata latest otp ekata gannwa
            if(latestOtp.otp == otp){
                User.findOneAndUpdate({email : email},{emailVerified : true}).then(()=>{            //otp hari nam user attribute emailverified eka true karnwa
                    res.json({
                        message : "User email verified successfully"
                    });
                });
            }else{
                res.json({
                    message : "OTP is invalid"
                });
            }
        
        }

    })
}