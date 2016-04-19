var mongoose = require('mongoose');
var urlSchema = mongoose.Schema({
    
    original: String,
    shortened: String
    
})

module.exports = mongoose.model('urls',urlSchema);