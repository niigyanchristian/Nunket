const mongoose = require("mongoose");

// A model for posting shop status
const Schema = mongoose.Schema;

const YourSchema = new Schema({
    Location:String,
    ErrorMeassage:String,
    createdAt: { type: Date, expires: 259200,
        //  86400 24hrs
    default: Date.now },
});

const Error = mongoose.models.Error || mongoose.model("Error",YourSchema);

module.exports = Error;