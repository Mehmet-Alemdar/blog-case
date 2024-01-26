const BaseService = require('./baseService')
const User = require('../models/user')

class UserService extends BaseService {
  async createUser(obj) {
    return await this.create(obj)
  }

  async getUserById(id) {
    return await this.getById(id)
  }

  async getUserByEmail(email) {
    return await this.getByProperty('email', email)
  }

  async updateUser(id, obj) {
    return await this.update(id, obj)
  }

  async deleteUser(id) {
    return await this.delete(id)
  }
}

module.exports = new UserService(User)