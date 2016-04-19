var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');

router.get('/*',function(req,res){
    var path = url.parse(req.originalUrl).path;
    var link = "https://" + req.hostname + path;
    console.log(path);
    console.log(link);
    mongoose.connect('mongodb://localhost/data2');
    var urlModel = require('../dbstuff/url');
    urlModel.find({shortened: link},function(err,found){
        if(err) throw err;
        else{
            if(found.length == 0){
                res.status(404)
                    .send("Not Found");
                    mongoose.connection.close();
            }
            else{
                res.redirect(301, found.original);
                mongoose.connection.close();
            }
        }
    })
})

module.exports = router;