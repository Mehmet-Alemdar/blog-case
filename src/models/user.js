const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 20},
  email: { type: String, required: true, trim: true, unique: true, minlength: 2, maxlength: 320},
  password: { type: String, required: true, trim: true, minlength: 6, maxlength: 100},
  age: { type: Number, required: true, min: 0},
  profilePicture: { type: String, trim: true, default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'},
})

module.exports = mongoose.model('User', userSchema)