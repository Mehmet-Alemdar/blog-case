class BaseService {
  constructor(model) {
    this.model = model
  }

  async create(data) {
    return await this.model.create(data)
  }

  async getAll() {
    return await this.model.find()
  }

  async getByPage(page, limit) {
    const skip = (page - 1) * limit
    return await this.model.find().skip(skip).limit(limit)
  }

  async getById(id) {
    return await this.model.findById(id)
  }

  async getByProperty(property, value) {
    return await this.model.findOne({ [property]: value })
  }

  async update(id, object) {
    return await this.model.findByIdAndUpdate(id, object, { new: true })
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id)
  }
}

module.exports = BaseService