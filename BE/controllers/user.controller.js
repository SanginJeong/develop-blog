const User = require('../model/User');
const bcrypt = require('bcrypt');

const userController = {};

userController.userLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    const token = user.generateToken();
    res.status(200).json({ status: 'Ok', user, token });
    
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message})
  }
}
module.exports = userController;