const mongoose = require('mongoose');

var validateEmail = function(email) {
    var regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexp.test(email)
};

const userSchema = new mongoose.Schema({
    userName: String,
    password : {type :String,required:true},
    email :{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']  
        },
    authentication: String,
    devicetoken: String,
    fingerprint: String

});
const users = mongoose.model('user',userSchema); 



module.exports = users;