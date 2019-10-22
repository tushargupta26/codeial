const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "User's Profile",
    });
}

// rendering for sign in
module.exports.SignIn = function(req,res){
    return res.render('sign-in',{
        title:"Codeial | Sign-In"
    });
}

// rendering for sign in
module.exports.SignUp = function(req,res){
    return res.render('sign-up',{
        title:"Codeial | Sign-Up"
    });
}


module.exports.createsession = function(req,res){
    
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in server while creating a server');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}