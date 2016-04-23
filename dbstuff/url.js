var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
    
    original: String,
    shortened: String
    
})

module.exports = mongoose.model('urls',urlSchema);