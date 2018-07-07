var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/home.html"));
// });
// app.get("/survey", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/survey.html"));
// });

module.exports = (function() {
    'use strict';
    var html = express.Router();
    html.use(bodyParser.urlencoded({ extended: true }));
    html.use(bodyParser.json());
    html.use(express.static(__dirname + '/'));


    html.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    html.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    return html;    
})();