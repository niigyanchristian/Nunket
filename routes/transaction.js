const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const Transaction = require('../models/transactions');
const Review = require('../models/shopReviews');
const jwt = require('jsonwebtoken');
const { shopId } = require('../models/gallery');
const { createAccount, updateAccount } = require('../hooks/accountFunctions');

const router = express.Router();

router.route('/:id').
get((req,res)=>{
    let userid = req.params.id;
    console.log('l');
   User.findById(userid,(err,find)=>{
    console.log(find);
    if(!err){
        if(find){
                res.status(200).send(find.transactionDetails); 
                }
        }else{
            res.status(403).send("User Not found");
        }
    }
   );
}).
post((req,res)=>{
    let {message,amount,refId,to,transaction,shopId} = req.body;
    let userid = req.params.id;

    const transactions = new Transaction({
        from:userid,
        shopId,
        transaction:transaction,
        message:message,
        amount:amount,
        refId:refId,
        to:to
    });
    transactions.save((err)=>{
        if(!err){
            //Create payment account
            // createAccount(to)
            updateAccount(amount,shopId);
            res.status(200).send(transactions);
        }else{
            res.status(403).send("Internal Server error");
        }
    })
});

module.exports = router;