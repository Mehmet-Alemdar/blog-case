const router = require('express').Router()
const { validateLogin, validateRegister } = require('../middlewares/userValidation')
const { handleInputError } = require('../middlewares/handleInputError')
const UserService = require('../services/userService')
const User = require('../models/user')
const { comparePassword, hashPassword, createJWT } = require('../auth/auth.js')

router.post('/register', validateRegister, handleInputError, async (req, res, next) => {
  try {
    const obj = req.body

    let userModel = new User(obj)
    userModel.password = await hashPassword(userModel.password)

    const token = createJWT(userModel)

    userModel = await UserService.createUser(userModel)

    res.send({id: userModel._id, token})
  } catch(err) {
    next(err)
  }
})

router.post('/login', validateLogin, handleInputError, async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await UserService.getUserByEmail(email)
    if(!user) {
      next({
        status: 401,
        message: 'There is no user registered with this email.'
      })
      return
    }

    const isPasswordValid = await comparePassword(password, user.password)
    if(!isPasswordValid) {
      next({
        status: 401,
        message: 'Invalid password'
      })
      return
    }

    const token = createJWT(user)
    
    res.send({id: user._id, token})
  } catch(err) {
    next(err)
  }
})
module.exports = router