const Inbox = require('../models/Inbox');

const inboxSend =(body,io)=>{
    console.log(body.message.message);
    const inbox = new Inbox({
        shopId: body.shopId,
        clientId: body.clientId,
        shop: body.shopName,
        client:body.client,
        message:body.message.message,
        date:body.date
    })
    inbox.save((err)=>{
      if(!err){
        console.log("done");
      }
      console.log(err);
    })
}

const inboxGet = (clientId,io)=>{
    console.log("get");
    Inbox.find({clientId:clientId},(err,find)=>{
        if(!err){
            io.emit("messages",{data:find.reverse(),status:200});
        }
    })
}

const inboxUpdate =(inboxId,clientId,io)=>{
    console.log("update");
    Inbox.findByIdAndUpdate(inboxId,{watched:true},(err)=>{
      if(!err){
        Inbox.find({clientId:clientId},(err,find)=>{
            if(!err){
                io.emit("messages",{data:find.reverse(),status:200});
            }
        })
      }
    })
  }
module.exports ={
    inboxSend,
    inboxGet,
    inboxUpdate
  }