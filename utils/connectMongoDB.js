const mongoose= require('mongoose')

const MongoDB = async()=> mongoose.connect(process.env.URL,{useNewUrlParser: true});

module.exports = MongoDB;
