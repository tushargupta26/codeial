const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // Post.find({},function(err,post){
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts: post
    //     });
    // });
    // populate the user of each post
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({}); {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_user: users
            });
        }
    }
    catch (err) {
        console.log(`ERROR ${err}`);
    }
}


// module.exports.actionname = function(req,res)