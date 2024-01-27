const { body, query, param } = require('express-validator')
const mongoose = require('mongoose')

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const validateBlogPost = [
  body('title')
    .exists().withMessage('Title must exist')
    .notEmpty().withMessage('Title is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Title must be at least 2 character long'),
  body('content')
    .exists().withMessage('Content must exist')
    .notEmpty().withMessage('Content is required')
    .trim()
    .isLength({ min: 3 }).withMessage('Content must be at least 3 character long')
]

const validateBlogQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a number greater than 0'),
  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit must be a number greater than 0')
]

const validateBlogUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('Title must be at least 2 character long'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Content must be at least 3 character long')
]

const validateBlogIdParam = [
  param('blogId')
    .custom(isValidObjectId).withMessage('Incorrect comment id format')
] 

module.exports = { validateBlogPost, validateBlogQuery, validateBlogUpdate, validateBlogIdParam }