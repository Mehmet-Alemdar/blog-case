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
    .isLength({ min: 2, max: 100 }).withMessage('Title must be at least 2 max 100 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Title can only contain alphanumeric characters and spaces')
    .escape(),
  body('content')
    .exists().withMessage('Content must exist')
    .notEmpty().withMessage('Content is required')
    .trim()
    .isLength({ min: 3, max: 5000 }).withMessage('Content must be at least 3 max 5000 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Content can only contain alphanumeric characters and spaces')
    .escape()
]

const validateBlogQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a number greater than 0')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Page number can only contain integer numbers')
    .escape(),
  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit must be a number greater than 0')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Limit number can only contain integer numbers')
    .escape()
]

const validateBlogUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Title must be at least 2 max 100 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Title can only contain alphanumeric characters and spaces')
    .escape(),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 3, max: 5000 }).withMessage('Content must be at least 3 max 500 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Content can only contain alphanumeric characters and spaces')
    .escape()
]

const validateBlogIdParam = [
  param('blogId')
    .custom(isValidObjectId).withMessage('Incorrect comment id format')
    .matches(/^[a-z0-9 ]+$/i).withMessage('BlogId can only contain alphanumeric characters and numbers')
    .escape()
]

const validateBlogSearchQuery = [
  query('q')
    .exists().withMessage('Query must exist')
    .notEmpty().withMessage('Query is required')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Query must be at least 2 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Content can only contain alphanumeric characters and spaces')
    .escape()
]

module.exports = { validateBlogPost, validateBlogQuery, validateBlogUpdate, validateBlogIdParam, validateBlogSearchQuery }