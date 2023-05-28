const mongoose = require("mongoose");

const paymentSchema= {
    date:{
        type:Number,
        required:true
    },
    day:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    payerId:String,
    paidAmount: {
        type: Number,
        required: true
    }
    

}
const accountSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    payerId:String,
    accountBalance: {
        type: Number,
        default: 0
      },
      paymentHistory: [paymentSchema]
});

const Account = mongoose.models.Account || new mongoose.model("Account", accountSchema);

module.exports = Account;