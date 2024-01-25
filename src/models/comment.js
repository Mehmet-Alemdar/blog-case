const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: { type: String, required: true, trim: true, minlength: 1},
  createdAt: { type: Date, default: Date.now},
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true}
})

module.exports = mongoose.model('Comment', commentSchema)