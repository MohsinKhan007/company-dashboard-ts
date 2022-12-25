import { Request,Response } from "express";
import { CallbackError, Types } from "mongoose";
import User,{IUser} from '../models/User.schema';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()

let UserId=1;

export const Register=async(req:Request,res:Response)=>{

   try{
     if (req.body.password !== req.body.password_confirm) {
       return res.status(501).json({
         error: "Please enter same passwords",
       });
     }

     let user = new User({
       id: UserId,
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       email: req.body.email,
       password: req.body.password,
       password_confirm: req.body.password_confirm,
     });

     user.save((err: CallbackError, sucess) => {
       if (!err) {
        UserId++;
         return res.json({
           message: "User is added sucessfully",
           user: user,
         });
       } else {
         return res.json({
           error: err,
         });
       }
     });
   }catch(err){
        return res.send(501).json({
          error: err,
        });
 
    }

} 

export const authenticatedUser = async (req: Request, res: Response) => {
  // why we don't get the specific filter values using the key value pair
  try {
    console.log(" user is logged in ",res.locals.user.user_id);
    const user: any = await User.findById(res.locals.user.user_id).select('first_name last_name email _id id')!;
  
   console.log(user," user");
    // console.log(restOfUser," rest of user");
    return res.json({
      message: "User which is logged in",
      data:(user),
    });

  } catch (e) {
    return res.json({ err: e, message: "Error occured" });
  }
};

export const Login=async(req:Request,res:Response)=>{

    try{

    const user=await User.findOne({email:req.body.email});

    if(!user){
        return res.json({
            err:"Email doesn't exist",
        })
    }

    const userMatch=user.Login(req.body.password);

    if(userMatch){
      let token = jwt.sign({user_id:user._id}, process.env.SECRET!, {
        expiresIn: '1d' 

   });
     if(token){
       res.json({
         token: token,
         message: "User is logged in Sucessfully",
       });
     }
    }
  }catch(e){
    return res.send({
      error:e
    })
  }

}

export const Logout=async(req:Request,res:Response)=>{

  try{
    const authHeader = req.headers["authorization"];


  jwt.sign(authHeader!,process.env.SECRET!,{expiresIn:1})

  return res.json({
    message:"User is logged out of the system"
  })

  }catch(e){
   return res.json({
     err: e,
     message: "An occur occured in the system",
   }); 
  }


}