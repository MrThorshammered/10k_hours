var express = require('express');
var app = express();
var methodOverride = require('method-override')

var mongoose = require('mongoose');

app.use(methodOverride('_method'));

   
    

module.exports = function(app, passport) {

    var Log = mongoose.model("Log");
    var User = mongoose.model("User");
    var Badge = mongoose.model("Badge")

    //=========
    //BADGES
    //=========    

    //SHOW ALL BADGES IN DATABASE (NOT WITH USER)

    app.get('/allbadges', function(req,res){
        Badge.find(function (err, badges){
            if (err)
                res.send(err);
            res.render('allbadges', {badges: badges})
        })
    })

    //SHOW BADGES FOR A USER
    app.get('/badges', isLoggedIn, function(req,res){
//work out total number of hours
        var totalhours = 0

        var logs = req.user.local.logs

        for (var i=0; i<logs.length;i++ ) {
            var hours = logs[i].hours
            totalhours += hours
        }
        console.log(totalhours)

        var badge = calculateBadge(totalhours)

//work out what badges the user has based on the total number of hours
    switch (true) {
        case (totalhours > 10 && totalhours < 14):
            console.log(totalhours)
            console.log('you have badge 1')
            break;
        case (totalhours > 15 && totalhours < 19):
            console.log('you have badge 1 and 2')
            break;
        case (totalhours > 20):
            console.log(totalhours)
            console.log('you have badge 1, 2, and 3')
            break;
        default:
            console.log('default')
            break;

    }

    BADGES = {
        '1': ['badge 1'],
        '2': ['badge 1', '2'],
        '3': ['badge 1', 2,3],
        '4': ['badge 1',2,3,4]
    }




        // console.log(req.user)

        Badge.findById('5614f3df85ffa83c2d9952bc', function(err, badge){
            if(err) console.log(err)
            //console.log(badge)
            req.user.local.badges.push(badge)
            //console.log(req.user)   
        })
        



        // var userBadges = req.user.local.badges
        // console.log(userBadges)
        // res.render('badges/index', { userBadges: userBadges });
    })

    //=========
    //LOGS
    //=========

    //SHOW ALL LOGS FOR THE LOGGED IN USER
    app.get('/logs', isLoggedIn, function(req,res){ 
         var userLogs = req.user.local.logs
            //res.json(userLogs)
        res.render('logs_views/index', { userLogs: userLogs });
    })

    //NEW LOG
    app.get('/logs/new', isLoggedIn, function(req,res){
        res.render('logs_views/new')
    })

    //CREATE LOG
    app.post('/logs', isLoggedIn, function(req,res){
    Log.create(req.body, function(err,log){
        console.log(req.body)
        if(err){
            res.send('error' + err)
        } else{
            var user = req.user
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


    //SHOW LOG
    app.get('/logs/:id', isLoggedIn, function(req, res){
        console.log(req.params)
        // var userLogs = req.user.local.logs
        // req.json(userLogs.this.id)
       Log.findById(req.params.id, function (err, log) {
        if(err) console.log(err)
        res.json(log)
       });

    })

    //EDIT LOG
    app.get('/logs/:id/edit', isLoggedIn, function(req, res){
        // var userLogs = req.user.local.logs
        // userLogs.findById(this.id)

        Log.findById(req.params.id, function (err, log) {
        if(err) console.log(err)
        res.render('logs_views/edit', 
            { log:log }
        )
       });
    })

    //UPDATE LOG
    app.post('/logs/:id', isLoggedIn, function(req,res){

        var log = req.user.local.logs.id(req.params.id);
        console.log(req.body)
        log.name = req.body.name

        req.user.save(function (err) {
            if(err) console.log(err)
            console.log('user saved')
            // log.save(function(err) {
            //     if(err) console.log(err)
            //     console.log('log saved')
            Log.findByIdAndUpdate(req.params.id, req.body, function(err,log){
                if(err) console.log(err) 
                })
            res.redirect(req.params.id) 
            })
            
        });


       
   

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
        
        
        res.redirect('/profile')



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
