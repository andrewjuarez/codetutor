var mongoose = require("mongoose");

// Session schema
var sessionSchema = new mongoose.Schema({
    id: String,
    desc: String
},{
    versionKey: false
});

// Session model
module.exports = mongoose.model("session", sessionSchema);