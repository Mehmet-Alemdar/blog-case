const { body } = require('express-validator')
const path = require('path')

const validateLogin = [
  body('email')
    .exists().withMessage('Email must exist')
    .notEmpty().withMessage('Email is required')
    .trim()
    .isEmail().withMessage('Email must be valid')
    .isLength({ min: 2, max: 320 }).withMessage('Title must be at least 2 max 320 character long')
    .escape(),
  body('password')
    .exists().withMessage('Password must exist')
    .notEmpty().withMessage('Password is required')
    .trim()
    .isLength({ min: 8, max: 100 }).withMessage('Password must be at least 8 max 100 character long')
    .escape()
]

const validateRegister = [
  body('email')
    .exists().withMessage('Email must exist')
    .notEmpty().withMessage('Email is required')
    .trim()
    .isEmail().withMessage('Email must be valid')
    .isLength({ min: 2, max: 320 }).withMessage('Title must be at least 2 max 320 character long')
    .escape(),
  body('password')
    .exists().withMessage('Password must exist')
    .notEmpty().withMessage('Password is required')
    .trim()
    .isLength({ min: 8, max: 100 }).withMessage('Password must be at least 8 max 100 character long')
    .escape(),
  body('name')
    .exists().withMessage('Name must exist')
    .notEmpty().withMessage('Name is required')
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('Name must be at least 2 max 20 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Name can only contain alphanumeric characters and spaces')
    .escape(),
  body('age')
    .exists().withMessage('Age must exist')
    .notEmpty().withMessage('Age is required')
    .trim()
    .isInt({ min: 0 }).withMessage('Age must be a positive number')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Age can only contain alphanumeric characters and spaces')
    .escape(),
  body('profilePicture')
    .optional()
    .trim()
    .isURL().withMessage('Profile picture must be a valid URL')
    .isLength({ min: 2, max: 520 }).withMessage('URL must be at least 2 max 320 character long')
    .custom((value, { req }) => {
      const fileExtension = path.extname(value).toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Profile picture must be a URL to an image file (jpg, jpeg, png, gif)');
      }
      return true;
    })
]

const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('Name must be at least 2 max 20 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Name can only contain alphanumeric characters and spaces')
    .escape(),
  body('age')
    .optional()
    .trim()
    .isInt({ min: 0 }).withMessage('Age must be a positive number')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Age can only contain alphanumeric characters and spaces')
    .escape(),
  body('profilePicture')
    .optional()
    .trim()
    .isURL().withMessage('Profile picture must be a valid URL')
    .isLength({ min: 2, max: 520 }).withMessage('URL must be at least 2 max 320 character long')
    .custom((value, { req }) => {
      const fileExtension = path.extname(value).toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Profile picture must be a URL to an image file (jpg, jpeg, png, gif)');
      }
      return true;
    })
]

const validateUserPasswordUpdate = [
  body('oldPassword')
    .exists().withMessage('Old password must exist')
    .notEmpty().withMessage('Old password is required')
    .trim()
    .isLength({ min: 8, max: 100 }).withMessage('Password must be at least 8 max 100 character long')
    .escape(),
  body('newPassword')
    .exists().withMessage('Password must exist')
    .notEmpty().withMessage('Password is required')
    .trim()
    .isLength({ min: 8, max: 100 }).withMessage('Password must be at least 8 max 100 character long')
    .escape()
]

module.exports = { validateLogin, validateRegister, validateUserUpdate, validateUserPasswordUpdate }