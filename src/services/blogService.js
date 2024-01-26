const BaseService = require('./baseService')
const Blog = require('../models/blog')

class BlogService extends BaseService {
  async createBlog(obj) {
    return await this.create(obj)
  }

  async getBlogById(id) {
    return await this.getById(id)
  }

  async getBlogByUserId(userId) {
    return await this.getByProperty('userId', userId)
  }

  async getBlogsByPage(page, limit) {
    return await this.getByPage(page, limit)
  }

  async updateBlog(id, obj) {
    return await this.update(id, obj)
  }

  async deleteBlog(id) {
    return await this.delete(id)
  }
}

module.exports = new BlogService(Blog)