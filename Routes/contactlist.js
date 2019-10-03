const express = require('express');
const contact = require('../Modules/contacts');
const user = require('../Routes/user')

const router =express.Router(); 


 //first API createcontact
router.post('/',(req,res,next)=>{
    
    const contacts =new contact({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email :req.body.email,
        phoneNumber :req.body.phoneNumber,
        userAuthentication:  req.body.userAuthentication,
        userDevicetoken:  req.body.userDevicetoken,
        userFingerprint:  req.body.userFingerprint
    })
          
      contacts.save((err,doc)=>{
         if(!err) {
             res.json(doc);
            }
         else {
            next();
        }
      })
 
 })
 //second API contactlist
 router.post('/',(req,res,next)=>{

     contact.find({userAuthentication:req.body.userAuthentication,
            userDevicetoken:req.body.userDevicetoken,
            userFingerprint:req.body.userFingerprint

    }).exec((err,doc)=>{
        if(!err) {
            res.json(doc);
        }
          else res.status(401).json({
              message : "couldn't reterive data"
          })
        })
 })
 //third API recentcontacts
 router.post('/recentContacts',(req,res,next)=>{

    contact.find({userAuthentication:req.body.userAuthentication,
           userDevicetoken:req.body.userDevicetoken,
           userFingerprint:req.body.userFingerprint

   }).sort('-date').limit(5).exec((err,doc)=>{
       if(!err) {
           res.json(doc);
       }
         else res.status(422).json({
             message : "couldn't reterive data"
         })
       })
})
router.all('**',(req,res)=>{
    res.status(404);
    res.send('page not found');
});


module.exports = router;