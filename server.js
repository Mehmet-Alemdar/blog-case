const express = require('express')
const  {errorHandler}  = require('./middlewares/errorHandler')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errorHandler)

module.exports = { app }
