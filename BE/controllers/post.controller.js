const Post = require('../model/Post');

const postController = {};

// 전체글 get 요청, 페이지네이션
postController.getPost = async (req, res) => {
  try {
    const postList = await Post.find({});
    const newPostList = postList.map((post)=>{
      return {
        ...post._doc,
        time : new Date(post.createdAt).toISOString().split('T')[0],
      }
    }).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({status:200, newPostList});
  } catch (error) {
    res.status(400).json({status:400, message: error.message});    
  }
}

postController.getPostDetail = async (req, res) => {
  try {
    const {id} = req.params;
    
    const post = await Post.findOne({_id:id})
    res.status(200).json({status:200, post});
  } catch (error) {
    res.status(400).json({status:400, message:error.message});
  }
}

// 새로운 글 추가 요청
postController.appendPost = async (req,res) => {
  try {
    const {title, content, category, author, postPassword} = req.body;
    if(!title){
      throw new Error("제목을 입력하세요.");
    }
    if(!content){
      throw new Error("내용을 입력하세요.");
    }
    if(!category){
      throw new Error("카테고리를 선택하세요.");
    }
    if(!postPassword){
      throw new Error("게시물 비밀번호를 입력하세요.");
    }

    const newPost = new Post({title,content,category,author,postPassword});
    await newPost.save();
    res.status(200).json({status: "Ok", newPost}); 
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}
// 글 수정 요청
// 글 삭제 요청


module.exports = postController;