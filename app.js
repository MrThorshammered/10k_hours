var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/10k')
express = require('express')
var router = express.Router();
var app = express();

var User = require('./models/user')
var Log = require('./models/log')
var Badge = require('./models/badge')

app.get('/', function(req, res){
  res.send("Hello World")
})

//adding in seed data

app.listen(process.env.PORT || 3000)