const mongoose = require('mongoose');
const User = require('./user');

const listSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true,
    },
    images: [],
    price: Number,
    categoryId: String,
    description:String,
    ownerId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:false
    },
    location: {
      latitude: String,
      longitude: String,
    },
    dateCreated:{
        type: Date,
        default:new Date(Date.now()).toDateString()
    },
});

const List = mongoose.models.List || new mongoose.model("List",listSchema);
module.exports = List;