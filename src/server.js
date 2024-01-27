const express = require('express')
const  {errorHandler}  = require('./middlewares/errorHandler')
const { protect } = require('./auth/auth')
require('../mongoConnection')
const user = require('./routers/user')
const blog = require('./routers/blog')
const comment = require('./routers/comment')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', user)
app.use('/blog', blog)
app.use('/comment', protect, comment)
app.use(errorHandler)

module.exports = { app }
