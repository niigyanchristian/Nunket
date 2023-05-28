const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const List = require('../models/list');

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/').
get((req,res)=>{
    List.find((err,find)=>{
        if(!err){
            res.send(find);
        }
    })
})
.post(async (req,res)=>{
    console.log("entered list");
    let {title,images,price,category,userId,latitude,longitude} = req.body;
   
    const list = new List(req.body);
    console.log(list);
    list.save((err)=>{
        if(!err){
            res.send(list)
        }else{
            res.send(err.message);
        }
    })
});

module.exports = router;

// {
//     title: title,
//     images: images,
//     price: price,
//     categoryId: category,
//     userId:userId,
//     description:description,
//     location: {
//       latitude: latitude,
//       longitude: longitude,
//     },
// }