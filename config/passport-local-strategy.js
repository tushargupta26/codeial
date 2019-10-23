const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// authenticate using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
},
    function(email,password,done){
        User.findOne({email: email},function(err,user){
            if(err){
                console.log(`Error in finding User --> Passport`);
                return done(err);
            }
            if(!user || user.password != password){
                console.log('`Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log(`Error in finding User --> Passport`);
                return done(err);
        }
        return done(null,user);
    });
});

// check if the user is autthenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in then pass on the request to next function(controllers action) 
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user conatins the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.users = req.user;
    }
    return next(); 
}

module.exports = passport;