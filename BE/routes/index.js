const express = require('express');
const router = express.Router();

router.use('/user',(req,res)=>{
  const {email, password} = req.body;
  res.send(email, password);
})

module.exports = router;