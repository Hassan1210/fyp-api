const mongoose = require('mongoose')

const schema =new  mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  token: String,

})
module.exports = mongoose.model('users', schema)