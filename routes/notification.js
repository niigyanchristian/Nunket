const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.route('/').
post(async (req,res)=>{
    let {token,userId}=req.body;

    const user=await User.findById(userId);
    if(user.pushNotificationToken == token){
        console.log("Token already exist!!!")
    }else{
        User.findByIdAndUpdate(userId,{pushNotificationToken:token},(err,found)=>{
            if(err){
                res.status(400).send(err.message);
            }else{
                
            }
        });
    }
});


module.exports = router;