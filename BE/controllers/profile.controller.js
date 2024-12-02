const Profile = require('../model/Profile');

const profileController = {};

profileController.updateProfile = async (req,res) => {
  try {
    const {content} = req.body;
    
    if(!content) {
      throw new Error("내용을 입력하세요");
    }

    let profile = await Profile.findOne();

    // 프로필이 있으면 내용을 바꾸고, 프로필이 없으면 새로 만듦
    if(profile) {
      profile.content = content;
      await profile.save();
    } else if(!profile) {
      profile = new Profile({content});
      await profile.save();
    }

    res.status(200).json({status: "Ok", profile});

  } catch (error) {
    res.status(400).json({status:"Fail", message:error.message});
  }
}

profileController.getProfile = async(req, res) => {
  try {
    const profile = await Profile.findOne();
    if(!profile) {
      return res.status(200).json({status: "Ok", content : null});
    }
    res.status(200).json({status: "Ok", content : profile.content});
  } catch (error) {
    res.status(400).json({status: "Fail", message: error.message});
  }
}

module.exports = profileController;