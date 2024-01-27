const { body } = require('express-validator');

const validateLogin = [
  body('email')
    .exists().withMessage('Email must exist')
    .notEmpty().withMessage('Email is required')
    .trim()
    .isEmail().withMessage('Email must be valid')
    .escape(),
  body('password')
    .exists().withMessage('Password must exist')
    .notEmpty().withMessage('Password is required')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 character long')
    .escape()
]

const validateRegister = [
  body('email')
    .exists().withMessage('Email must exist')
    .notEmpty().withMessage('Email is required')
    .trim()
    .isEmail().withMessage('Email must be valid')
    .escape(),
  body('password')
    .exists().withMessage('Password must exist')
    .notEmpty().withMessage('Password is required')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 character long')
    .escape(),
  body('name')
    .exists().withMessage('Name must exist')
    .notEmpty().withMessage('Name is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 character long')
    .escape(),
  body('age')
    .exists().withMessage('Age must exist')
    .notEmpty().withMessage('Age is required')
    .trim()
    .isInt({ min: 0 }).withMessage('Age must be a positive number')
    .escape(),
  body('profilePicture')
    .optional()
    .trim()
    .isURL().withMessage('Profile picture must be a valid URL')
    .escape()
]

const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 character long')
    .escape(),
  body('age')
    .optional()
    .trim()
    .isInt({ min: 0 }).withMessage('Age must be a positive number')
    .escape(),
  body('profilePicture')
    .optional()
    .trim()
    .isURL().withMessage('Profile picture must be a valid URL')
    .escape()
]

const validateUserPasswordUpdate = [
  body('oldPassword')
    .exists().withMessage('Old password must exist')
    .notEmpty().withMessage('Old password is required')
    .trim()
    .isLength({ min: 6 }).withMessage('Old password must be at least 6 character long')
    .escape(),
  body('newPassword')
    .exists().withMessage('Password must exist')
    .notEmpty().withMessage('Password is required')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 character long')
    .escape()
]

module.exports = { validateLogin, validateRegister, validateUserUpdate, validateUserPasswordUpdate }