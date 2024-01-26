const router = require('express').Router()
const { validateCommentPost, validateCommentIdParam, validateCommentUpdate } = require('../middlewares/commentValidation')
const { handleInputError } = require('../middlewares/handleInputError')
const CommentService = require('../services/commentService')
const BlogService = require('../services/blogService')
const UserService = require('../services/userService')

router.post('/', validateCommentPost, handleInputError, async (req, res, next) => {
  try {
    const obj = req.body

    if(obj.author != req.user.id) {
      next({
        status: 401,
        message: 'Unauthorized'
      })
      return
    }

    const user = await UserService.getUserById(obj.author)
    if(!user) {
      next({
        status: 404,
        message: 'User not found'
      })
      return
    }

    const blog = await BlogService.getBlogById(obj.blog)
    if(!blog) {
      next({
        status: 404,
        message: 'Blog not found'
      })
      return
    }
    
    const comment = await CommentService.createComment(obj)

    res.status(201).json(comment)
  } catch(err) {
    next(err)
  }
})

router.get('/blog/:id', validateCommentIdParam, handleInputError, async (req, res, next) => {
  try {
    const { id } = req.params

    const blog = await BlogService.getBlogById(id)
    if(!blog) {
      next({
        status: 404,
        message: 'Blog not found'
      })
      return
    }

    const comments = await CommentService.getCommentsByBlogId(id)

    res.status(200).json(comments)
  } catch(err) {
    next(err)
  }
})

router.get('/user/:id', validateCommentIdParam, handleInputError, async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await UserService.getUserById(id)
    if(!user) {
      next({
        status: 404,
        message: 'User not found'
      })
      return
    }

    const comments = await CommentService.getCommentsByUserId(id)

    res.status(200).json(comments)
  } catch(err) {
    next(err)
  }
})

router.patch('/:id', validateCommentIdParam, validateCommentUpdate, handleInputError, async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await CommentService.getCommentById(id)
    if(!comment) {
      next({
        status: 404,
        message: 'Comment not found'
      })
      return
    }

    if(comment.author._id.toString() !== req.user.id) {
      next({
        status: 403,
        message: 'You are not allowed to update this comment'
      })
      return
    }

    const { content } = req.body
    const updatedComment = await CommentService.updateComment(id, { content })

    res.status(200).json(updatedComment)
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', validateCommentIdParam, handleInputError, async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await CommentService.getCommentById(id)
    if(!comment) {
      next({
        status: 404,
        message: 'Comment not found'
      })
      return
    }

    if(comment.author._id.toString() !== req.user.id) {
      next({
        status: 403,
        message: 'You are not allowed to delete this comment'
      })
      return
    }

    await CommentService.deleteComment(id)

    res.status(200).json({message: 'Comment deleted successfully'})
  } catch(err) {
    next(err)
  }
})

module.exports = router