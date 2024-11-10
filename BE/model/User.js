const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
  name : {
    type: String,
  },
  email : {
    type: String,
    required: true,
  },
  password : {
    type: String,
    required: true,
  }
},{timeStamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;