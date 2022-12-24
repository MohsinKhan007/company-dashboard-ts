import { Request,Response } from "express";
import { CallbackError } from "mongoose";
import User from '../models/User.schema';

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