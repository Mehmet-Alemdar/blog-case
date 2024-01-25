const errorHandler = (err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something broke!'
  
  res.status(errorStatus).send({
    status: errorStatus,
    message: errorMessage
  })
}

module.exports = { errorHandler }