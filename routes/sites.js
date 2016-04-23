var express = require('express');
var router = express.Router();
var url = require('url');
var validator = require('validator');
var mongoose = require('mongoose');
var urls = require('../dbstuff/url');
var bodyParser = require('body-parser');
var shortID = require('shortid');

router.get('/*', function(req,res){
    console.log("using site.js")
    var parsed = url.parse(req.path).path.slice(1);
    console.log(parsed);
    if(validator.isURL(parsed,{protocols:['http','https'],require_protocol:true})){
    

        urls.find({original: parsed},{_id:0, shortened: 1, original: 1},function(err,found){
            if(err) throw err;
            else{
                if(found.length == 0){
                    console.log("adding to database");
                    var newModel = new urls();
                    var newID = shortID.generate();
                    newModel.shortened = "https://urlshortener-gkt5015.c9users.io/short/"+newID;
                    newModel.original = parsed;
                    newModel.save(function(err,data){
                        if(err) throw err;
                        res.json({ original:data.original, shortened:data.shortened,});
                        console.log("finished appending to database and finished with site.js")

                    })
                }
                else{
                    res.json(found[0]);
                    console.log("finished with site.js")
                }
                
            }
            

        });
    }
    else{
        res.send("False");
    }
})

module.exports = router;