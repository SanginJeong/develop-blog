const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = Schema({
  content : {
    type : Schema.Types.Mixed,
    required : true,
  },
},{timestamps: true});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
