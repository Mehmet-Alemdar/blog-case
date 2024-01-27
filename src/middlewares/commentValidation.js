const { body, param } = require('express-validator')
const mongoose = require('mongoose')

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const validateCommentPost = [
  body('content')
    .exists().withMessage('Content must exist')
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Content must be at least 1 max 200 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Content can only contain alphanumeric characters and spaces')
    .escape(),
  body('blog')
    .exists().withMessage('Blog must exist')
    .trim()
    .custom(isValidObjectId).withMessage('Incorrect comment id format')
    .matches(/^[a-z0-9 ]+$/i).withMessage('BlogId can only contain alphanumeric characters and numbers')
    .escape()
]

function validateObjectIdParam(paramName) {
  return [
    param(paramName)
      .custom(isValidObjectId).withMessage(`Incorrect ${paramName} format`)
      .exists().withMessage(`${paramName} must exist`)
      .trim()
      .matches(/^[a-z0-9 ]+$/i).withMessage('Id can only contain alphanumeric characters and numbers')
      .escape()
  ];
}

const validateCommentUpdate = [
  body('content')
    .exists().withMessage('Content must exist')
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Content must be at least 1 max 200 character long')
    .matches(/^[a-z0-9 ]+$/i).withMessage('Content can only contain alphanumeric characters and spaces')
    .escape()
]

module.exports = { validateCommentPost, validateObjectIdParam, validateCommentUpdate }