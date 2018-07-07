var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var homepath= __dirname;
//var apipath=require("./routing/apiRouts.js");
var htmlpath=require("./routing/htmlRouts.js");
var people=require("./app/data/friends.js");
//console.log( __dirname);
//console.log(people);
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

var indexer=0;
var diff=0;
var outsidediff=5000;

// var people = [
//     {
//       name: "test1",
//       image: "http://via.placeholder.com/200x200",
//       answers:[1,2,3,4,5,1,2,3,4,5]
//     },
//     {
//         name: "test2",
//         image: "http://via.placeholder.com/200x200",
//         answers:[1,1,1,1,1,1,1,1,1,1]
//     },
//     {
//         name: "test3",
//         image: "http://via.placeholder.com/200x200",
//         answers:[3,3,3,3,3,3,3,3,3,3]
//     },
//     {
//         name: "test4",
//         image: "http://via.placeholder.com/200x200",
//         answers:[5,5,5,5,5,5,5,5,5,5]
//     },
// ];

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/home.html"));
// });
// app.get("/survey", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/survey.html"));
// });

app.get("/api/people", function(req, res) {
    return res.json(people);
});

app.post("/api/people", function(req, res) {
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
    res.json(people[indexer]);
});

//app.use('/api/people', apipath);
app.use('/', htmlpath);
app.use('/survey', htmlpath);





app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
