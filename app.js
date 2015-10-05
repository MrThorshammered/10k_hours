var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/10k')
express = require('express')
var router = express.Router();
var app = express();

var Log = require('./models/log')
var Badge = require('./models/badge')
var User = require('./models/user')


app.get('/', function(req, res){
  res.send("Hello World")
})

//adding in seed data
var firstLog = new Log({
  name: 'My first swinging session',
  date: '01/04/2001',
  type: 'Practice',
  hours: 2,
  notes: 'It was hard',
  video: 'www.myvideo.com'
})

firstLog.save(function(err, log){
  if (err) console.log(err)
    console.log("first log saved")
})

var Badge1 = new Badge({
  name: "100 hours logged!",
  image: "www.penis.com"
})

Badge1.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})
var Jack = new User({
  name: 'Jack Somervell',
  password: 'password',
  discipline: 'Golf',
  badges: Badge1,
  logs: firstLog
})

Jack.save(function(err, user){
  if (err) console.log(err)
    console.log("Jack saved")
})



app.listen(process.env.PORT || 3000)