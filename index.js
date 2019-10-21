const express = require ('express');
const port=8000;
const app=express();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.use(express.urlencoded());

// use express router
app.use('/',require('./router'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server is up on port :${port}`);
});