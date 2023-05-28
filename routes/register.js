const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/')
.post(async (req,res)=>{
    console.log("entered");
    let {name,password,email} = req.body;
   
    // console.log(encryptedPassword);
    User.findOne({email:email}, (err,user)=>{
        if(err){
            res.send(err.message);
        }else{
            if(user){
                res.status(403).send("User with the email( "+email+" ) alredy exist");
            }else{
                const client = new User({
                    name: _.upperFirst(name),
                    email: email,
                    password:password,
                });
                // Create token
                const token = jwt.sign(
                    {client},
                    process.env.TOKEN_KEY,
                );
                client.save((err)=>{
                    if(!err){
                        res.status(200).send(token);
                    }else{
                        res.status(401).send("Unable to regiser user");
                    }
                });
            }
        }
    });
});

module.exports = router;