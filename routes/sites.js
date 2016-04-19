var express = require('express');
var router = express.Router();
var url = require('url');
var validator = require('validator');
var mongoose = require('mongoose');
var shortID = require('shortid');
router.get('/*', function(req,res){
    var parsed = url.parse(req.url).path.slice(1);
    console.log(parsed);
    if(validator.isURL(parsed,{protocols:['http','https'],require_protocol:true})){
        mongoose.connect('mongodb://localhost:/data2')
        var urlModel = require('../dbstuff/url');
        urlModel.find({original: parsed},{_id:0, shortened: 1, original: 1},function(err,found){
            if(err) throw err;
            else{
                if(found.length == 0){
                    var newModel = new urlModel();
                    var newID = shortID.generate();
                    newModel.shortened = "https://urlshortener-gkt5015.c9users.io/short/"+newID;
                    newModel.original = parsed;
                    newModel.save(function(err,data){
                        if(err) throw err;
                        res.json({ original:data.original, shortened:data.shortened,});
                        mongoose.connection.close();
                    })
                }
                else{
                    res.json(found[0]);
                    mongoose.connection.close();
                }
            }
        });
    }
    else{
        res.send("False");
    }
})

module.exports = router;