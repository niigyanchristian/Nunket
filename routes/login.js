const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.route('/').
post(async (req,res)=>{
    let {email,password} = req.body;
    User.findOne({email:email},(err,found)=>{
        if(err){
            res.status(400).send(err.message);
        }else{
            if(found){
                if(found.password == password){
                    const token = jwt.sign(
                        {client},
                        process.env.TOKEN_KEY,
                      );
                    res.status(200).json(JSON.stringify(token));  
                }else{
                    res.status(401).send('wrong password');
                }
            }else{
                res.status(401).send("wrong credentials");
            }
        }
    });
});


module.exports = router;