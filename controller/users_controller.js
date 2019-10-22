const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title : "User Profile",
                    user : user
                })
            }
            if(!user){
                return res.redirect('/users/sign-in');
            }
        });
    }
    else
    return res.redirect('/users/sign-in');
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
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log(`Error in finding the user during sign-in`);
            return;
        }
        if(user){
        if(user.password != req.body.password){
            console.log("Password doesnt match");
            return res.redirect('back');
        }
        else{
            res.cookie("user_id",user.id);
            return res.redirect('/users/profile')
        }
    }
    else{
        console.log(`No such User exist`);
        return res.redirect('back');
    }
    });
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,users){
        if(err){
            console.log('error in finding the user during sign-up');
            return;
        }
        if(!users){
            User.create(req.body,function(err,users){
                if(err){
                    console.log('Error in server while creating a user');
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


module.exports.logout = function(req,res){
    res.cookie('user_id',undefined);
    return res.redirect('/users/sign-in');
}