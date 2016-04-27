var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var url = require('url');

router.get('/',function(req,res){
    console.log("using the redirect path.....")
    var link = "https://" + req.hostname + req.originalUrl;
    console.log(req.params);
    console.log(link);
    var urlModel = require('../dbstuff/url');
     urlModel.find({shortened: link},function(err,found){
        if(err) throw err;
        else{
            if(found.length == 0){
                res.status(404)
                    .send("Not Found")
                console.log("found nothing.....");

            }
            else{
                //res.send(found);
                res.redirect(301, found[0].original);
                console.log("found something..... "+ found[0].original);
                

            }
            

        }

    })
    
})

module.exports = router;