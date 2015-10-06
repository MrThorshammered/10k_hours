var passport = require("passport")
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Log = mongoose.model("Log");
var User = mongoose.model("User");
var bodyParser   = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


function allLogs(req,res) {
  // var logs = Log.find()
  console.log('logs')
 //User.local.logs.find({}, function (err, logs) {
    //res.json(logs);
  //});
}

module.exports = {
  allLogs: allLogs,
}