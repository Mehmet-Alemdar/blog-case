const { body, query, param } = require('express-validator')

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
    .isLength({ min: 3 }).withMessage('Content must be at least 3 character long'),
  body('author')
    .exists().withMessage('Author must exist')
    .notEmpty().withMessage('Author is required')
    .trim()
    .isLength({ min: 24, max: 24 }).withMessage('Incorrect user id format')
    .escape()
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
    .isLength({ min: 24, max: 24 }).withMessage('Incorrect blog id format')
]

module.exports = { validateBlogPost, validateBlogQuery, validateBlogUpdate, validateBlogIdParam }