const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const indexRouter = require('./routes/index');
const mongoURI = "mongodb://localhost:27017/user";

app.use('/api', indexRouter);

mongoose.connect(mongoURI, {useNewUrlParser:true})
  .then(()=>{
    console.log('몽구스 밥버거 연결완료'); 
  })
  .catch((error)=>{
    console.log('mongoose fail:', error);
  })

app.listen(5000, ()=>{
  console.log("express 5000 connected");
})