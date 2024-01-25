const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: { type: String, required: true, trim: true, minlength: 2},
  content: { type: String, required: true, trim: true, minlength: 3},
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  likes: { type: Schema.Types.ObjectId, ref: 'User', default: []},
  createdAt: { type: Date, default: Date.now},
})

module.exports = mongoose.model('Blog', blogSchema)