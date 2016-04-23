var express = require('express');
var app = express();
var port = process.env.PORT || 8081;
var index = require('./routes/index');
var sites = require('./routes/sites');
var all = require('./routes/all');
var mongoose = require('mongoose');
var redirect = require('./routes/redirect');
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
mongoose.connect('mongodb://localhost/data2');
app.use('/', index);
app.use('/new',sites);
app.use('/all',all);
app.get('/delete',function(req,res){

    var urlModel = require('./dbstuff/url.js');
    urlModel.remove({},function(err,info){
        if (err) throw err;
        else{
            res.send("All deleted");
        }
    });
})
app.use('/short/:id',redirect);


app.listen(port);