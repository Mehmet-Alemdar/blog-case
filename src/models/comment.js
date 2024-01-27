const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: { type: String, required: true, trim: true, minlength: 1},
  createdAt: { type: Date, default: Date.now},
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: { select: 'name profilePicture' }},
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true},
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: []}],
})

commentSchema.index({ '$**': 'text' })
commentSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Comment', commentSchema)