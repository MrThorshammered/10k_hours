var express = require('express');
var app = express();
var methodOverride = require('method-override')

var mongoose = require('mongoose');

app.use(methodOverride('_method'));

    //=========
    //LOGS
    //=========
    // var logsController = require('./controllers/logs');
    // var logsRouter = express.Router();

    // logsRouter.route('/logs')
    // .get(logsController.allLogs);

module.exports = function(app, passport) {

    var Log = mongoose.model("Log");
    var User = mongoose.model("User");

    //SHOW ALL LOGS FOR THE LOGGED IN USER
    app.get('/logs', isLoggedIn, function(req,res){ 
         var userLogs = req.user.local.logs
            //res.json(userLogs)
        res.render('logs/index', { userLogs: userLogs });
    })

    //NEW
    app.get('/logs/new', isLoggedIn, function(req,res){
        res.render('logs/new')
    })

    //CREATE
    app.post('/logs', isLoggedIn, function(req,res){
    Log.create(req.body, function(err,log){
        console.log(req.body)
        if(err){
            res.send('error' + err)
        } else{
            user = req.user
            console.log('user:'+ user)
            
            console.log('log:'+ log)

            user.local.logs.push(log)
            user.save(function(err,user){
                if(err)console.log(err);
                console.log('user saved')
            })
            res.redirect('/logs')
        }
    })
})


    //SHOW
    app.get('/logs/:id', isLoggedIn, function(req, res){
        console.log(req.params)
        // var userLogs = req.user.local.logs
        // req.json(userLogs.this.id)
       Log.findById(req.params.id, function (err, log) {
        if(err) console.log(err)
        res.json(log)
       });

    })

    //EDIT
    app.get('/logs/:id/edit', isLoggedIn, function(req, res){
        // var userLogs = req.user.local.logs
        // userLogs.findById(this.id)

        Log.findById(req.params.id, function (err, log) {
        if(err) console.log(err)
        res.render('logs/edit', 
            { log:log }
        )
       });
    })

    //UPDATE
    app.post('/logs/:id', isLoggedIn, function(req,res){
        Log.findByIdAndUpdate(req.params.id, req.body, function(err,log){
            if(err) console.log(err)
            res.redirect(req.params.id) 
        })
    })

    //DELETE
    app.delete('/logs/:id', isLoggedIn, function(req,res){
        var user = req.user
        var logId = req.params.id
        user.local.logs.id(req.params.id).remove();
        user.save(function (err) {
            if(err) console.log(err)
            Log.findByIdAndRemove(logId, function(err, log){
                if(err) console.log(err)
                console.log('log deleted')
            })
            res.redirect('/logs') 
        });
    })







    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.post('/', passport.authenticate('facebook',{
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
   
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


// adding discipline to facebook signup
    app.get('/add-discipline', isLoggedIn, function(req, res) {
        res.render('facebook-signup.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.post('/add-discipline', isLoggedIn, function(req, res)  {
        console.log(req.user)
        console.log(req.body)
        req.user.local.discipline = req.body.discipline
        req.user.save(function(err) {
                if (err)
                    res.send(err);

                console.log("user updated!");
            });
        
        
        res.render('profile.ejs', {
            user : req.user
        })



    });


 // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'user_photos'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/add-discipline',
            failureRedirect : '/'
        }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


// facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : ['email', 'user_photos'] }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/add-discipline',
                failureRedirect : '/'
            }));
// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
