const mongoose = require('mongoose')

const schema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  up_time: Date,
  deviceId: String,
  logId: String,
  verifyMode: String,
  ioMode: String,
  ioTime: Date,
  sync: Boolean,
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
  logType: String,
  location: String,
  project: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  uD: { type: mongoose.Schema.Types.ObjectId, ref: 'userDetails' },
  address:String,
  pushToFirebase:Boolean,
})
module.exports = mongoose.model('userlogs', schema)
