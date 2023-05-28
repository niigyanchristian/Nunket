const mongoose = require('mongoose');
const transactionSchema =new mongoose.Schema({
    payerId:String,
    date:{
        type: Date,
        default:new Date(Date.now()).toDateString()
    },
    served:{
        type:Boolean,
        default:false
    },
    amount:String,
    refId:String,
})

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction",transactionSchema);

module.exports = Transaction;