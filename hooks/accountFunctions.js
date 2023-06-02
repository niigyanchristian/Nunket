const Account = require('../models/accounting');
// const Shop = require('../models/Shops');


const updateAccount =async(amount,userId,payerId)=>{
    
    //Set parameters for payment history
    let paymentHistory={
        date: new Date().getDate(),
        day: new Date().getDay(),
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        paidAmount: amount,
        payerId  
    }
   
     try {
        const account =await Account.findOne({userId});
         //Checking if account exist then update
         if(account){
            // calculate balance
            let balance= account.accountBalance+amount;
            await Account.findByIdAndUpdate(account._id,{accountBalance:balance,$push:{paymentHistory}});
            return true;
         }else{
            // create new account for shop
            console.log('CREATING NEW ACCOUNT...');
            await createAccount(userId);
            console.log('ACCOUNTED!');
            // Update the created account
            updateAccount(amount,userId,payerId);
         }
     } catch (error) {
         console.log("error",error._message);
     }

}

const createAccount= async(userId)=>{

    try {
        // Check if account doesn't exit before creating 
        const account = await Account.findOne({userId});
        if(!account){
            await Account.create({userId});
        }
    } catch (error) {
        console.log('error in AccountFunction', error)
    }
}

const getAccountDetails = async(userId)=>{
    try {
        const account = await Account.findOne({userId});
        if(account){
            return account;
        }

    } catch (error) {
        
    }
}

module.exports ={ 
    updateAccount,
    createAccount,
    getAccountDetails
}