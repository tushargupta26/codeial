const express = require ('express');
const port=8000;
const app=express();
app.use(express.urlencoded());
app.use('/',require('./router'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server is up on port :${port}`);
});