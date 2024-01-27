const router = require('express').Router()
const { protect } = require('../auth/auth')
const { validateLogin, validateRegister, validateUserUpdate, validateUserPasswordUpdate } = require('../middlewares/userValidation')
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

router.patch('/update', protect, validateUserUpdate, handleInputError, async (req, res, next) => {
  try {
    const {name, profilePicture, age} = req.body
    const id = req.user.id

    const user = await UserService.getUserById(id)
    if(!user) {
      next({
        status: 404,
        message: 'User not found'
      })
      return
    }

    const updatedUser = await UserService.updateUser(id, {name, profilePicture, age})

    res.status(200).send({message: 'User updated successfully', user: updatedUser})
  } catch(err) {
    next(err)
  }
})

router.patch('/change-password', protect, validateUserPasswordUpdate, handleInputError, async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body
    const id = req.user.id

    const user = await UserService.getUserById(id)
    if(!user) {
      next({
        status: 404,
        message: 'User not found'
      })
      return
    }

    const isPasswordValid = await comparePassword(oldPassword, user.password)
    if(!isPasswordValid) {
      next({
        status: 401,
        message: 'Invalid password'
      })
      return
    }

    const hashedPassword = await hashPassword(newPassword)
    const updatedUser = await UserService.updateUser(id, {password: hashedPassword})

    res.status(200).send({message: 'Password updated successfully', user: updatedUser})
  } catch(err) {
    next(err)
  }
})
module.exports = router