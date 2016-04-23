var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var urlModel = require('../dbstuff/url');


router.get('/',function(req,res){
urlModel.find({}).exec(function(err,data){
    if(err){
        throw err;
    }
    else{
        res.send(data);

    }
})
})

module.exports = router;