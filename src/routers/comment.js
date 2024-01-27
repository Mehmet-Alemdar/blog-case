const router = require('express').Router()
const { protect } = require('../auth/auth')
const { validateCommentPost, validateObjectIdParam, validateCommentUpdate } = require('../middlewares/commentValidation')
const { handleInputError } = require('../middlewares/handleInputError')
const CommentService = require('../services/commentService')
const BlogService = require('../services/blogService')
const UserService = require('../services/userService')

// create comment
router.post('/', protect, validateCommentPost, handleInputError, async (req, res, next) => {
  try {
    const obj = req.body
    const userId = req.user.id

    const user = await UserService.getUserById(userId)
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
    
    obj.author = user._id
    const comment = await CommentService.createComment(obj)

    res.status(201).json({message: 'Comment created successfully', comment})
  } catch(err) {
    next(err)
  }
})

// get comments by blog id
router.get('/blog/:blogId', validateObjectIdParam("blogId"), handleInputError, async (req, res, next) => {
  try {
    const { blogId } = req.params

    const blog = await BlogService.getBlogById(blogId)
    if(!blog) {
      next({
        status: 404,
        message: 'Blog not found'
      })
      return
    }

    const comments = await CommentService.getCommentsByBlogId(blogId)

    res.status(200).json(comments)
  } catch(err) {
    next(err)
  }
})

// get comments by user id
router.get('/user/:userId', validateObjectIdParam("userId"), handleInputError, async (req, res, next) => {
  try {
    const { userId } = req.params

    const user = await UserService.getUserById(userId)
    if(!user) {
      next({
        status: 404,
        message: 'User not found'
      })
      return
    }

    const comments = await CommentService.getCommentsByUserId(userId)

    res.status(200).json(comments)
  } catch(err) {
    next(err)
  }
})

// update comment
router.patch('/:commentId', protect, validateObjectIdParam("commentId"), validateCommentUpdate, handleInputError, async (req, res, next) => {
  try {
    const { commentId } = req.params
    const userId = req.user.id

    const comment = await CommentService.getCommentById(commentId)
    if(!comment) {
      next({
        status: 404,
        message: 'Comment not found'
      })
      return
    }

    if(comment.author._id.toString() !== userId) {
      next({
        status: 403,
        message: 'You are not allowed to update this comment'
      })
      return
    }

    const { content } = req.body
    const updatedComment = await CommentService.updateComment(commentId, { content })

    res.status(200).json({message: 'Comment updated successfully', updatedComment})
  } catch(err) {
    next(err)
  }
})

// like comment
router.patch('/like/:commentId', protect, validateObjectIdParam("commentId"), handleInputError, async (req, res, next) => {
  try{
    const { commentId } = req.params
    const userId = req.user.id

    const user = await UserService.getUserById(userId)
    if(!user) {
      next({
        status: 404,
        message: 'User not found'
      })
      return
    }

    const comment = await CommentService.getCommentById(commentId)
    if(!comment) {
      next({
        status: 404,
        message: 'Comment not found'
      })
      return
    }

    const isLiked = comment.likes.includes(userId)

    if(isLiked) {
      await CommentService.unlikeComment(commentId, userId)
      res.status(200).json({message: 'Comment unliked successfully'})
      return
    } else {
      await CommentService.likeComment(commentId, userId)
      res.status(200).json({message: 'Comment liked successfully'})
      return
    }
  }catch(err) {
    next(err)
  }
})

// delete comment
router.delete('/:commentId', protect, validateObjectIdParam("commentId"), handleInputError, async (req, res, next) => {
  try {
    const { commentId } = req.params
    const userId = req.user.id

    const comment = await CommentService.getCommentById(commentId)
    if(!comment) {
      next({
        status: 404,
        message: 'Comment not found'
      })
      return
    }

    if(comment.author._id.toString() !== userId) {
      next({
        status: 403,
        message: 'You are not allowed to delete this comment'
      })
      return
    }

    await CommentService.deleteComment(commentId)

    res.status(200).json({message: 'Comment deleted successfully'})
  } catch(err) {
    next(err)
  }
})

module.exports = router