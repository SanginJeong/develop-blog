const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = Schema({
  title : {
    type: String,
    required: true,
  },
  webURL : {
    type: String,
    required: true,
  },
  gitURL : {
    type: String,
    required: true,
  }
},{timestamps: true});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;