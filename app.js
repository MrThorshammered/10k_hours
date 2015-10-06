

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var methodOverride = require('method-override')
app.use(methodOverride('_method'));


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
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'samjackmike' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


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


// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//adding in seed data
// var firstLog = new Log({
//   name: 'My first swinging session',
//   date: '01/04/2001',
//   type: 'Practice',
//   hours: 2,
//   notes: 'It was hard',
//   video: 'www.myvideo.com'
// })

// firstLog.save(function(err, log){
//   if (err) console.log(err)
//     console.log("first log saved")
// })

// var Badge1 = new Badge({
//   name: "100 hours logged!",
//   image: "www.penis.com"
// })

// Badge1.save(function(err, badge){
//   if (err) console.log(err)
//     console.log("badge saved!")
// })
// var Jack = new User({
//   local: {
//     name: 'Jack Somervell',
//     email: 'jack@jack.com',
//     password: 'password',
//     discipline: 'Golf',
//     badges: Badge1,
//     logs: firstLog
//   }
// })

// Jack.save(function(err, user){
//   if (err) console.log(err)
//     console.log("Jack saved")
// })

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);