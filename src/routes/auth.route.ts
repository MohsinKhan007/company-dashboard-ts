
import { Register,Login, Logout,authenticatedUser } from '../controller/auth.controller';

import express from 'express';
const router = express.Router();
import { userRegisterValidator } from '../middlewares/validators/register.validator';
import { userLoginValidator } from '../middlewares/validators/login.validator';
import { UserRoutesValidator } from '../middlewares/validators/userRoute.validator';
import {runValidation} from '../middlewares/validators';

// resgister route
router.post('/register',userRegisterValidator,runValidation,Register);
router.post('/login',userLoginValidator,runValidation,Login);
router.get('/protected',UserRoutesValidator,(req,res)=>{

    console.log("protected routes");
    console.log("User routes in protected",(res.locals.user) )
    

    res.json({
        message:"protected routes"
    })

})
router.get('/user',UserRoutesValidator,authenticatedUser)

router.post('/logout',UserRoutesValidator,Logout)


 
export default router;

