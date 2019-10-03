const express = require('express');
const users = require('../Modules/users')

const router =express.Router();

router.post('/',(req,res,next)=>{
   const user =new users({
    userName:req.body.userName,
    email:req.body.email,
    password:req.body.password,
    authentication: req.body.authentication,
    devicetoken: req.body.devicetoken,
    fingerprint: req.body.fingerprint

   })
         
     user.save((err,doc)=>{
        if(!err) {res.json(doc);}
        else res.status(422).json({  
            message : "couldn't save data"
        })
        console.error(err);
     })
    
})

router.get('/',(req,res,next)=>{
 
    users.find({},(err,doc)=>{
      if(!err) {res.json(doc);}
        else res.status(422).json({
            message : "couldn't reterive data"
        })
    })
})
 


module.exports = router;