var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");
var people=require("../app/data/friends.js");
var indexer=0;
var diff=0;
var outsidediff=5000;

// app.get("/api/people", function(req, res) {
//     return res.json(people);
// });

// app.post("/api/people", function(req, res) {
//     var newpeople= req.body;

//     for(var i=0; i<10; i++){
//         newpeople.answers[i]=parseInt(newpeople.answers[i]);
//     }
//     for(var i=0; i<people.length; i++){
//         for(var r=0;r<10;r++){
//             diff+=Math.abs(people[i].answers[r]-newpeople.answers[r]);
//         }
//         console.log("Diff is: "+diff);
//         if(outsidediff>=diff){
//             outsidediff=diff;
//             indexer=i;
//         }
//         diff=0;
//         console.log("Outsidediff is: "+outsidediff+" indexer is: "+indexer);
//     }
//     people.push(newpeople);
//     res.json(people[indexer]);
// });



module.exports = (function() {
    'use strict';
    var api = express.Router();
    api.use(bodyParser.urlencoded({ extended: true }));
    api.use(bodyParser.json());
    api.use(express.static(__dirname + '/'));


    api.get("/api/people", function(req, res) {
        res.send( res.json(people));
    });
    
    api.post("/api/people", function(req, res) {
        var newpeople= req.body;
    
        for(var i=0; i<10; i++){
            newpeople.answers[i]=parseInt(newpeople.answers[i]);
        }
        for(var i=0; i<people.length; i++){
            for(var r=0;r<10;r++){
                diff+=Math.abs(people[i].answers[r]-newpeople.answers[r]);
            }
            console.log("Diff is: "+diff);
            if(outsidediff>=diff){
                outsidediff=diff;
                indexer=i;
            }
            diff=0;
            console.log("Outsidediff is: "+outsidediff+" indexer is: "+indexer);
        }
        people.push(newpeople);
        res.send(res.json(people[indexer]));
    });
    return api;
})();