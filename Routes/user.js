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
        if(!err) {        res.json({message : "succsse",status:200,doc});
}
        else res.status(422).json({  
            message : "couldn't save data"
        })
       
     })
    
})

router.get('/',(req,res,next)=>{
 
    users.find({},(err,doc)=>{
      if(!err) {        res.json({message : "succsse",status:200,doc});
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
