import { body } from 'express-validator'


export const userValidationRules = [
  body('name')
    .exists().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

  body('age')
    .exists().withMessage('Age is required')
    .isInt({ min: 0 }).withMessage('Age must be a positive integer'),

  body('isEmployed')
    .exists().withMessage('Employment status is required')
    .isBoolean().withMessage('Employment status must be a boolean'),
];
