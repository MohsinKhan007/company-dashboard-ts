import {body } from 'express-validator';


export const userLoginValidator=[
    body('email').notEmpty().isEmail().withMessage('Must be a valid Email'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be 6 chatacters long'),
];