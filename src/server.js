const express = require('express')
const cors = require('cors')
const  {errorHandler}  = require('./middlewares/errorHandler')
require('../mongoConnection')
const user = require('./routers/user')
const blog = require('./routers/blog')
const comment = require('./routers/comment')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', user)
app.use('/blog', blog)
app.use('/comment', comment)
app.use(errorHandler)

module.exports = { app }
