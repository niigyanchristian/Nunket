const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    receiverId:{
        type:String,
        require:true
    },
    senderId:{
        type:String,
        require:true,
    },
    title:String,
    senderProfilePic:String,
    message: {
        type:String,
        require:true,
    },
    itemId:{
        type:String,
        require:true,
    },
    dateCreated:{
        type: Date,
        default:new Date(Date.now()).toDateString()
    },
});

const Message = mongoose.models.Message || new mongoose.model("Message",messageSchema);
module.exports = Message;