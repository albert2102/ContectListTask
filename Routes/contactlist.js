const express = require('express');
const contact = require('../Modules/contacts');
const user = require('../Routes/user')

const router =express.Router(); 


 //first API createcontact
router.post('/createcontact',(req,res,next)=>{
    
    const contacts =new contact({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email :req.body.email,
        phoneNumber :req.body.phoneNumber,
        userId:req.body.userId,
        userAuthentication:  req.body.userAuthentication,
        userDevicetoken:  req.body.userDevicetoken,
        userFingerprint:  req.body.userFingerprint
    })
          
      contacts.save((err,doc)=>{
         if(!err) {
             res.json({message : "succsse",status:200,doc});
            }
         else {
             res.json({message:"Can't Save Data",status:422});
        }
      })
 
 })

 //second API contactlist
 router.post('/allcontacts',(req,res,next)=>{

     contact.find({userAuthentication:req.body.userAuthentication,
            userDevicetoken:req.body.userDevicetoken,
            userFingerprint:req.body.userFingerprint

    },(err,doc)=>{
        if(!err && doc.length !=0) {
            res.json({message : "succsse",status:200,doc});
        }
           else if(err){
             res.json({message:"Can't Retrive Data",status:422});
             }
        else if(doc.length === 0){
            res.json({message:"There isn't such user",status:432});
        }
        })
 }) 

 //third API recentcontacts
 router.post('/recentContacts',(req,res,next)=>{

    contact.find({userAuthentication:req.body.userAuthentication,
           userDevicetoken:req.body.userDevicetoken,
           userFingerprint:req.body.userFingerprint

   }).sort('-date').limit(5).exec((err,doc)=>{
    if(!err && doc.length !=0) {
        res.json({message : "succsse",status:200,doc});
    }
       else if(err){
         res.json({message:"Can't Retrive Data",status:422});
         }
    else if(doc.length === 0){
        res.json({message:"There isn't such user",status:432});
    }
    })
})


 
router.all('**',(req,res)=>{
    res.status(404);
    res.send('page not found');
});


module.exports = router;
