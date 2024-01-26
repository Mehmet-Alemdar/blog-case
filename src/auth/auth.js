const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

const createJWT = (user) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, "test secret", { expiresIn: '1m' })

  return token
}

const protect = async (req, res, next) => {
  const brearer = req.headers.authorization

  if(!brearer) {
    next({
      status: 401,
      message: 'Unauthorized'
    })
    return
  }

  const[,token] = brearer.split(' ')

  if(!token) {
    next({
      status: 401,
      message: 'Not valid token'
    })
    return
  }

  try {
    const user = jwt.verify(token, "test secret")
    req.user = user
    next()
  }catch(err) {
    res.status(401).json({
      message: 'Not valid token'
    })
    return 
  }
}

module.exports = {
  comparePassword,
  hashPassword,
  createJWT,
  protect
}