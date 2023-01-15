const mongoose = require('mongoose');


const schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    diseaseId:mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('doctors',schema);