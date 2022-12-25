import jwt, { JwtPayload } from 'jsonwebtoken';
// import NextFunction from 'express';
import {Response,Request,NextFunction} from 'express';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
export const UserRoutesValidator=(req:Request,res:Response,next:NextFunction)=>{

try{
   const token: string = req.headers.authorization?.split(" ")[1]!;
   const jwtVerify:JwtPayload|string=jwt.verify(token!,process.env.SECRET!)!

   if(jwtVerify){
    res.locals.user=jwtVerify;
        next();
   }

    
}catch(e){
return res.json({
    err:e,
    message:"Authentication failed"
})
}


}