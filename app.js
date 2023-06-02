require('dotenv').config();
const express = require("express");
const bodyParser = require('express').json;

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const listRoute = require('./routes/list');
const paymentRoute = require('./routes/paymentDetails');
const notificationRoute = require('./routes/notification');

const MongoDB =require('./utils/connectMongoDB');


const app = express(); 
app.use(bodyParser());
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Transaction = require('./models/transactions');
const ErrorMeassaging = require('./models/error');
const io = new Server(server);

console.log('CONNECTING TO DATABASE...');
MongoDB();
console.log('DATABASE CONNECTED');





//END POINTS
app.use('/api/register',registerRoute);
app.use('/api/login',loginRoute);
app.use('/api/list',listRoute);
app.use('/api/payment',paymentRoute);
app.use('/api/expoPushTokens',notificationRoute);



io.on('connection', (socket) => {

    socket.on("transactions",async msg=>{
        const payerId = msg.body.payerId;
        if(msg.method === "GET"){
          const transactions = await Transaction.find({payerId})
          io.emit("transactions",transactions);
      
      }
    });
    socket.on("orders",async msg=>{
        const getTransactions=async ()=>{
          const transactions = await Transaction.find()
          const orders = transactions.filter(item => item.served === false);
          io.emit("orders",orders);
        }
        if(msg.method === "GET"){
          
         getTransactions()
      }
        if(msg.method === "POST"){
          const {item} = msg.body;
          await Transaction.findByIdAndUpdate(item._id,{served:true});
          getTransactions();
      }
    });

    socket.on("errors",async msg=>{
      await ErrorMeassaging.create(msg.body);        
    });


   

  });




server.listen(process.env.PORT, () => {
    console.log(`Nunket Backend Is Running On Port ${process.env.PORT}`)
  });