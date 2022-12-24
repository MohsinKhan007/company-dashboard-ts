
import { Register } from '../controller/auth.controller';

import express from 'express';
const router = express.Router();
import { userRegisterValidator } from '../middlewares/validators/register.validator';
import {runValidation} from '../middlewares/validators';

// resgister route
router.post('/register',userRegisterValidator,runValidation,Register);

export default router;

