const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log("Error in creating the post ",err);
            return ;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){
                console.log(`Error in creating a comment ${err}`);
                return ;
                }
                post.comment.push(comment);
                post.save();
                return res.redirect('back');
            })
        }
    });
}