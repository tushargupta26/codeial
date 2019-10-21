const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        required:true,
        type:String
    },
    name: {
        type:String,
        required: true
    }
}, {
        timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;