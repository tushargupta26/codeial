module.exports.home = function(req,res){
    // return res.end("<h1>Ejs is up for codeial</h1>");
    return res.render('home',{
        title:"Home"
    })
}

// module.exports.actionname = function(req,res)