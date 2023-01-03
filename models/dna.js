const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    dna:String,
    nickName:String,
    affactedGene:String,
});
module.exports = mongoose.model('diseases',schema);