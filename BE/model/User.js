const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema({
  email : {
    type: String,
    required: true,
  },
  password : {
    type: String,
    required: true,
  },
  name : {
    type: String,
    required: true,
  },
  administrator : {
    type: Boolean,
    required: true,
  }
},{timestamps:true});

userSchema.methods.generateToken = function(){
  const token = jwt.sign({
    _id:this._id,
    name: this.name,
  }, JWT_SECRET_KEY);
  return token
}

const User = mongoose.model("User", userSchema);


module.exports = User;