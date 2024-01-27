const { body, param } = require('express-validator')
const mongoose = require('mongoose')

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const validateCommentPost = [
  body('content')
    .exists().withMessage('Content must exist')
    .trim()
    .isLength({ min: 1 }).withMessage('Content must be at least 1 character long'),
  body('blog')
    .exists().withMessage('Blog must exist')
    .trim()
    .custom(isValidObjectId).withMessage('Incorrect comment id format')
    .escape()
]

const validateCommentIdParam = [
  param('id')
    .custom(isValidObjectId).withMessage('Incorrect comment id format')
    .exists().withMessage('Blog id must exist')
    .trim()
    .escape()
]

const validateCommentUpdate = [
  body('content')
    .exists().withMessage('Content must exist')
    .trim()
    .isLength({ min: 1 }).withMessage('Content must be at least 1 character long')
]

module.exports = { validateCommentPost, validateCommentIdParam, validateCommentUpdate }