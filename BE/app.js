const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const indexRouter = require('./routes/index');
const mongoURI = "mongodb://localhost:27017/blog";

app.use('/api', indexRouter);

mongoose.connect(mongoURI)
  .then(()=>{
    console.log('몽구스 밥버거 연결완료'); 
  })
  .catch((error)=>{
    console.log('mongoose fail:', error);
  })

app.listen(5000, ()=>{
  console.log("express 5000 connected");
})