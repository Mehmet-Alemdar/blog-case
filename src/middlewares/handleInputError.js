const { validationResult } = require('express-validator');

// return error for validations
const handleInputError = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    res.status(400)
    res.json({ errors: errors.array() })
  } else {
    next()
  }
}

module.exports = { handleInputError }