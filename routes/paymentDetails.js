const express = require('express');
const { getAccountDetails, updateAccount } = require('../hooks/accountFunctions');
const Transaction = require('../models/transactions');

const router = express.Router();

router.route('/:id').get(async(req,res)=>{
    const id= req.params.id;
    const account = await getAccountDetails(id);
    if(account){
        res.send(account);
    }
}).post(async (req,res)=>{
    const {amount,payerId,receiverId,status,refId}=req.body;

    if(status == 'success'){
        await Transaction.create({amount,payerId,refId});
        updateAccount(amount,receiverId,payerId) ? res.send("Transaction went on successfuly"): null
    }
});

module.exports = router;