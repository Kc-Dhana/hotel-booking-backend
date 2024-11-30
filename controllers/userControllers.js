import User from "../models/user.js"
import jwt from 'jsonwebtoken' //jwt athuentication (token)
import bcrpty from  'bcrypt'
import dotenv from 'dotenv'
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
            res.json({
                message : "User Created Succesfully"
            })
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