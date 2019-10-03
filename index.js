const express = require('express');
const mongoose = require('mongoose');
const usersrouter = require ('./Routes/user');
const contactlistrouter = require ('./Routes/contactlist');


mongoose.connect ('mongodb://localhost:27017/contectlist',
    {    useNewUrlParser: true,
        useUnifiedTopology: true
    },(err)=>{
    if(!err) console.log("connected with server mongodb")
     else {console.error(err);}
    
});

const app= express();

app.use(express.json());


app.use('/user',usersrouter);
app.use('/contactlist',contactlistrouter);

app.listen(3000,(err) => {
    if(!err){ console.log("start server on port :3000")}
     else {console.error(err);}
    
});
