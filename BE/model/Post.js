const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = Schema({
  title : {
    type: String,
    required : true,
  },
  category : {
    type : String,
    required : true,
  },
  author : {
    type : String,
    required : true,
  },
  content : {
    type : String,
    required : true,
  },
  image : {
    type : String,
  },
  isFixed : {
    type : Boolean,
    required : true,
  }
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;