const express = require('express')
const  {errorHandler}  = require('./middlewares/errorHandler')
require('../mongoConnection')
const user = require('./routers/user')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', user)
app.use(errorHandler)

module.exports = { app }
