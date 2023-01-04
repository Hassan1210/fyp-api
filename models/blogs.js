const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    category:String
});
module.exports = mongoose.model('blogs',schema);