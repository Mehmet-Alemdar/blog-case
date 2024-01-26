const errorHandler = (err, req, res, next) => {
  let errorStatus = err.status || 500
  let errorMessage = err.message || 'Something broke!'

  if(err.code === 11000) {
    errorStatus = 400
    errorMessage = 'Email already exists'
  }
  
  res.status(errorStatus).send({
    status: errorStatus,
    message: errorMessage
  })
}

module.exports = { errorHandler }