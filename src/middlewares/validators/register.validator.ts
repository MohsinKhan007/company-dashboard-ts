import {body } from 'express-validator';


export const userRegisterValidator=[

    body('first_name').notEmpty().withMessage('First Name is required'),
    body('last_name').notEmpty().withMessage('First Name is required'),
    body('email').notEmpty().isEmail().withMessage('Must be a valid Email'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be 6 chatacters long'),
    body('password_confirm').notEmpty().isLength({ min: 6 }).withMessage('Password must be 6 chatacters long')

];