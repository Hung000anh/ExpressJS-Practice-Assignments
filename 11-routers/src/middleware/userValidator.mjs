import { body, param, query } from 'express-validator';

export const searchUserValidator = [
  query('name').optional().isString().withMessage('name must be a string'),
  query('isEmployed').optional().isBoolean().withMessage('isEmployed must be boolean'),
  query('age').optional().isInt({ min: 0 }).withMessage('age must be a non-negative integer'),
];

export const createUserValidator = [
  body('name').isString().withMessage('Name must be a string'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
  body('isEmployed').isBoolean().withMessage('isEmployed must be boolean')
];

export const updateUserValidator = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
  body('isEmployed').optional().isBoolean().withMessage('isEmployed must be boolean')
];

export const userIdParamValidator = [
  param('id').isInt().withMessage('ID must be an integer')
];
