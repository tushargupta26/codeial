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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull :{comment : req.params.id}},function(err,post){
                return res.redirect('back');
        });
        }
        else{
            return res.redirect('back');
        }
    });
}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id) 
    .populate('post')
    .exec(function(err,comment){
        Post.findById(comment.post,function(err,post){
            if(comment.user == req.user.id || req.user.id == post.user._id){
                let postId = comment.post;
                console.log(postId);
                comment.remove();
                Post.findByIdAndUpdate(postId, { $pull :{comment : req.params.id}},function(err,post){
                    return res.redirect('back');
            });
            }
            else{
                return res.redirect('back');
            }
        })
    });
}

