const router = require('express').Router()
const { validateBlogPost, validateBlogQuery, validateBlogUpdate, validateBlogIdParam } = require('../middlewares/blogValidation')
const { handleInputError } = require('../middlewares/handleInputError')
const UserService = require('../services/userService')
const BlogService = require('../services/blogService')

// create blog
router.post('/', validateBlogPost, handleInputError, async (req, res, next) => {
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
router.patch('/:blogId', validateBlogIdParam, validateBlogUpdate, handleInputError, async (req, res, next) => {
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

    if(blog.author._id != req.user.id) {
      next({
        status: 401,
        message: 'Unauthorized'
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

// delete blog
router.delete('/:blogId', validateBlogIdParam, handleInputError, async (req, res, next) => {
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

    if(blog.author._id != req.user.id) {
      next({
        status: 401,
        message: 'Unauthorized'
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