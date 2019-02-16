import mongoose from 'mongoose';

// Session schema
const sessionSchema = new mongoose.Schema({
  id: String,
  desc: String
}, {
  versionKey: false
});

// Session model
module.exports = mongoose.model("session", sessionSchema);
