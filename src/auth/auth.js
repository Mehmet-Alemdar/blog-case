const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// compare password
const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

// hash password
const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

// create jwt token
const createJWT = (user) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, "test secret", { expiresIn: '1h' })

  return token
}

// protect routes
const protect = async (req, res, next) => {
  const token = req.headers.authorization

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