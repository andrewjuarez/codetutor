var mongoose = require("mongoose");

// Submission schema
var submissionSchema = new mongoose.Schema({
    sessionID: String,
    name: String,
    code: String
},{
    versionKey: false
});

// Submission model
module.exports = mongoose.model("submission", submissionSchema);