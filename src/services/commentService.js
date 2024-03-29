const BaseService = require('./baseService')
const Comment = require('../models/comment')

class CommentService extends BaseService {
  async createComment(obj) {
    return await this.create(obj)
  }

  async getCommentById(id) {
    return await this.getById(id)
  }
  
  async getCommentsByUserId(userId) {
    return await this.getByProperty('author', userId)
  }

  async getCommentsByBlogId(blogId) {
    return await this.getByProperty('blog', blogId)
  }

  async updateComment(id, obj) {
    return await this.update(id, obj)
  }

  async deleteComment(id) {
    return await this.delete(id)
  }

  async likeComment(id, userId) {
    return await this.update(id, { $addToSet: { likes: userId } })
  }

  async unlikeComment(id, userId) {
    return await this.update(id, { $pull: { likes: userId } })
  }
}

module.exports = new CommentService(Comment)