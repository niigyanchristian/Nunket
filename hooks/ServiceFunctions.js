const Service = require('../models/services');

const clientGet =(id,io)=>{
    Service.find({clientId:id},(err,find)=>{
        if(!err){
          io.emit("services",{data:find.reverse(),status:200});
        }else{
          console.log("there is an error");
        }
      })
}
const clientPost =(data,io)=>{
  const service = new Service(data);
  service.save((err)=>{
    if(!err){
      Service.find({to:data.to},(err,find)=>{
        if(!err){
          io.emit("orders",{data:find.reverse(),status:200});
        }else{
          console.log("there is an error");
        }
      })
      console.log("done!");
    }else{
      console.log("there is an error");
    }
  })
}
const clientUpdate =(serviceId,clientId,io)=>{
  Service.findByIdAndUpdate(serviceId,{watched:true},(err,find)=>{
    console.log(find);
    Service.find({clientId:clientId},(err,find)=>{
      if(!err){
        io.emit("services",{data:find.reverse(),status:200});
      }else{
        console.log("there is an error");
      }
    })
  })
}


//  THE SHOP ORDERS
const ordersGet =(id,io)=>{
    Service.find({shopId:id},(err,find)=>{
      if(!err){
        io.emit("orders",{data:find.filter((service)=>service.status !== "Served").reverse(),status:200});
      }else{
        console.log("there is an error");
      }
    })
}

const ordersUpdate =(serviceId,shopId,status,io)=>{
  Service.findByIdAndUpdate(serviceId,{status:status},(err)=>{
    if(!err){
      Service.find({shopId:shopId},(err,find)=>{
        if(!err){
          io.emit("orders",{data:find.reverse(),status:200});
        }else{
          console.log("there is an error");
        }
      })
    }
  })
}
module.exports ={
  clientGet,
  clientPost,
  clientUpdate,
  ordersGet,
  ordersUpdate
}
