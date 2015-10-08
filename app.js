

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var methodOverride = require('method-override')
var moment = require('moment')



//var router = express.Router(); taken out for now as routing was set up differently by Sam

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// configuration ===============================================================
//mongoose.connect(configDB.localhost); // connect to our database
mongoose.connect('mongodb://localhost/10k')

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console

app.use(bodyParser()); // get information from html forms
app.use( express.static( "public" ) );
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(cookieParser('secret')); // read cookies (needed for auth)
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash()); // use connect-flash for flash messages stored in session


// required for passport
//app.use(session({ secret: 'samjackmike' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));
moment().format();

var Log = require('./models/log')
var Badge = require('./models/badge')
var User = require('./models/user')

//middleware
//=======================
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// app.use(function() {
//   app.use(express.cookieParser('keyboard cat'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());
// });




// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//***************All badge seed data******************

var Baby_step = new Badge({
  name: "Baby Step",
  image: "images/baby_step.png"
})

Baby_step.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var best_in_class = new Badge({
  name: "Best in class",
  image: "images/best_in_class.png"
})

best_in_class.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var bright_spark = new Badge({
  name: "Bright spark",
  image: "images/bright_spark.png"
})

bright_spark.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var collaborator = new Badge({
  name: "Collaborator",
  image: "images/collaborator.png"
})

collaborator.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var deep_thinker = new Badge({
  name: "Deep thinker",
  image: "images/deep-thinker.png"
})

deep_thinker.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var deep_thinker2 = new Badge({
  name: "Deep thinker 2",
  image: "images/deep-thinker2.png"
})

deep_thinker2.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var distinguished = new Badge({
  name: "Distinguished",
  image: "images/distinguished.png"
})

distinguished.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var frequent_user = new Badge({
  name: "Frequent user",
  image: "images/frequent_user.png"
})

frequent_user.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var guru = new Badge({
  name: "Guru",
  image: "images/guru.png"
})

guru.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var hard_worker = new Badge({
  name: "Hard worker",
  image: "images/hard-worker.png"
})

hard_worker.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var innovator = new Badge({
  name: "Innovator",
  image: "images/innovator.png"
})

innovator.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var master = new Badge({
  name: "Master",
  image: "images/master.png"
})

master.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var pathfinder = new Badge({
  name: "Pathfinder",
  image: "images/pathfinder.png"
})

pathfinder.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var Pro = new Badge({
  name: "Pro",
  image: "images/pro.png"
})

Pro.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

var teacher = new Badge({
  name: "Teacher",
  image: "images/teacher.png"
})

teacher.save(function(err, badge){
  if (err) console.log(err)
    console.log("badge saved!")
})

//code that adds a badge to a user depending on criteria


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);