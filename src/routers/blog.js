const router = require('express').Router()
const { protect } = require('../auth/auth')
const { validateBlogPost, validateBlogQuery, validateBlogUpdate, validateBlogIdParam, validateBlogSearchQuery } = require('../middlewares/blogValidation')
const { handleInputError } = require('../middlewares/handleInputError')
const UserService = require('../services/userService')
const BlogService = require('../services/blogService')

// create blog
router.post('/', protect, validateBlogPost, handleInputError, async (req, res, next) => {
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

    obj.author = user._id
    const blog = await BlogService.createBlog(obj)

    res.status(201).send({message: 'Blog created successfully', blog})
  } catch(err) {
    next(err)
  }
})

// get blogs by page
router.get('/', validateBlogQuery, handleInputError, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const blogs = await BlogService.getBlogsByPage(page, limit)
    res.send(blogs)
  } catch(err) {
    next(err)
  }
})

// search blogs by title
router.get('/search', validateBlogSearchQuery, handleInputError, async (req, res, next) => {
  try {
    const query = req.query.q

    const blogs = await BlogService.searchBlogByTitle(query)

    res.send(blogs)
  } catch(err) {
    next(err)
  }
})

// get blog by id
router.get('/:blogId', validateBlogIdParam, handleInputError, async (req, res, next) => {
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

    res.send(blog)
  } catch(err) {
    next(err)
  }
})

// update blog
router.patch('/:blogId', protect, validateBlogIdParam, validateBlogUpdate, handleInputError, async (req, res, next) => {
  try {
    const { blogId } = req.params
    const userId = req.user.id

    const blog = await BlogService.getBlogById(blogId)
    if(!blog) {
      next({
        status: 404,
        message: 'Blog not found'
      })
      return
    }

    if(blog.author._id.toString() != userId) {
      next({
        status: 401,
        message: 'You are not allowed to update this blog'
      })
      return
    }
    const { title, content } = req.body

    if(!title && !content) {
      next({
        status: 400,
        message: 'Nothing to update'
      })
      return
    }

    const updatedBlog = await BlogService.updateBlog(blogId, { title, content })
    res.status(200).send({message: 'Blog updated successfully', updatedBlog})
  } catch(err) {
    next(err)
  }
})

// like blog
router.patch('/like/:blogId', protect, validateBlogIdParam, handleInputError, async (req, res, next) => {
  try{
    const { blogId } = req.params
    const userId = req.user.id

    const user = await UserService.getUserById(userId)
    if(!user) {
      next({
        status: 404,
        message: 'User not found'
      })
      return
    }

    const blog = await BlogService.getBlogById(blogId)
    if(!blog) {
      next({
        status: 404,
        message: 'Blog not found'
      })
      return
    }

    const isLiked = blog.likes.includes(userId)

    if(isLiked) {
      await BlogService.unlikeBlog(blogId, userId)
      res.status(200).send({message: 'Blog unliked successfully'})
      return
    } else {
      await BlogService.likeBlog(blogId, userId)
      res.status(200).send({message: 'Blog liked successfully'})
      return
    }
  } catch(err) {
    next(err)
  }
})

// delete blog
router.delete('/:blogId', protect, validateBlogIdParam, handleInputError, async (req, res, next) => {
  try {
    const { blogId } = req.params
    const userId = req.user.id

    console.log(blogId, userId)

    const blog = await BlogService.getBlogById(blogId)
    if(!blog) {
      next({
        status: 404,
        message: 'Blog not found'
      })
      return
    }

    if(blog.author._id.toString() != userId) {
      next({
        status: 401,
        message: 'You are not allowed to delete this blog'
      })
      return
    }

    await BlogService.deleteBlog(blogId)
    res.status(200).send({message: 'Blog deleted successfully'})
  } catch(err) {
    console.log(err.message)
    next(err)
  }
})


module.exports = router