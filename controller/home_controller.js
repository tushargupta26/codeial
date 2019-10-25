const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // Post.find({},function(err,post){
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts: post
    //     });
    // });
    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comment',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
}

// module.exports.actionname = function(req,res)