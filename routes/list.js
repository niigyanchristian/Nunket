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
    const list = new List(req.body);
    list.save((err)=>{
        if(!err){
            res.send(list)
        }else{
            res.send(err.message);
        }
    })
});

router.route('/:id').
post((req,res)=>{
    const {id} = req.params;
    List.findByIdAndDelete(id).
    then(data=>{
        res.send(data);
    })

})


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