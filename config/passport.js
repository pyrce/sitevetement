//var path = require('path');
var LocalStrategy   = require('passport-local').Strategy;
//dbvar passport=require('passport');
var User = require( '../model/users').users;

module.exports = function(passport) {

    passport.serializeUser(function(user, done){
        done(null, false);
    });
    passport.deserializeUser(function(id, done){

      User.findOne({id:id}, function (err, user) {
          if(err) console.log(err)
          console.log(user)
            done(err, user);
        });
 
    });
    passport.use('local-login',new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
       
    	
    	
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }).then( function(err, user) {
            // if there are any errors, return the error before anything else
            console.log(user)
            if (err)
            return done(null, false, req.flash('error', err)); // req.flash is the way to set flashdata using connect-flash


            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('error', 'Sorry Your Account Not Exits ,Please Create Account.')); // req.flash is the way to set flashdata using connect-flash

            
            
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
           //if(user.password!=password)
                return done(null, false, req.flash('error', 'Email and Password Does Not Match.')); // create the loginMessage and save it to session as flashdata
            
            // all is well, return successful user
            req.session.user = user;
		
            return done(null, user);
        });
  
    }));
}
