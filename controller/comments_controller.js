const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comment.push(comment);
            post.save();
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error ", err);
        return;
    }
};

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }, function (err, post) {
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Error in creating the post ", err);
        return;
    }
};

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id).populate('post');
        let post = await Post.findById(comment.post)
        if (comment.user == req.user.id || req.user.id == post.user._id) {
            let postId = comment.post;
            console.log(postId);
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }, function (err, post) {
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Error in creating the post ", err);
        return;
    }
};

