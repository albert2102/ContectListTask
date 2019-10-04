const mongoose = require('mongoose');
const validate = require('mongoose-validator')

//validatin for email and name
var validateEmail = function(email) {
    var regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexp.test(email)
};
var nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
      validator: 'isAlphanumeric',
      passIfEmpty: true,
      message: 'Name should contain alpha-numeric characters only',
    }),
  ]

  //contactlist schema
const contactsSchema = new mongoose.Schema({
    firstName: {type :String,required:true, validate: nameValidator},
    lastName:{type :String,required:true, validate: nameValidator},
    phoneNumber:{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{11}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    email :{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']  
        },
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
        userAuthentication: {type:String},
        userDevicetoken: {type:String},
        userFingerprint: {type:String}
});


const contacts = mongoose.model('contact',contactsSchema); 



module.exports = contacts;
