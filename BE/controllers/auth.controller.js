const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req,res,next) => {
  try {
    const tokenString = req.headers.authorization;
    
    if(!tokenString) {
      throw new Error("권한이 없습니다.");
    }

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (error,payload) => {
      if(error) {
        throw new Error("권한이 없습니다.");
      }
      req.userInfo = {
        id: payload._id,
        name: payload.name,
      }
      next();
    })
    
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message})
  }
}


module.exports = authController;