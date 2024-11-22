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
    const {postId} = req.params;
    
    const post = await Post.findOne({_id: postId})
    res.status(200).json({status:200, post});
  } catch (error) {
    res.status(400).json({status:400, message:error.message});
  }
}

// 새로운 글 추가 요청
postController.appendPost = async (req,res) => {
  try {
    const {title, content, category} = req.body;
    const {name} = req.userInfo;
    if(!title){
      throw new Error("제목을 입력하세요.");
    }
    if(!content){
      throw new Error("내용을 입력하세요.");
    }
    if(!category){
      throw new Error("카테고리를 선택하세요.");
    }

    const newPost = new Post({title,content,category,author:name});
    await newPost.save();
    res.status(200).json({status: "Ok", newPost}); 
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}
// 글 수정 요청
postController.updatePost = async (req,res) => {
  try {
    const {postId} = req.params;
    const {title, category,content} = req.body;
    console.log(postId,title,category,content);
    
    if(!postId) {
      throw new Error("해당 게시물을 찾을 수 없습니다.");
    }
    if(!title){
      throw new Error("제목을 입력하세요.");
    }
    if(!content){
      throw new Error("내용을 입력하세요.");
    }
    if(!category){
      throw new Error("카테고리를 선택하세요.");
    }
    const updatedPost = await Post.updateOne({_id: postId},{title,category,content});
    res.status(200).json({status:"Ok", updatedPost});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }

}
// 글 삭제 요청 : User 에서 author를 찾고 그 사람이 관리자이면 and 글쓴이 본인이면 삭제,수정 가능
postController.deletePost = async (req,res) => {
  try {
    const { idList } = req.body;
    if(idList.length < 1) {
      throw new Error("삭제할 게시물을 선택하세요.");
    }
    const deletedPost = await Post.deleteMany({_id : {$in : idList}});
    res.status(200).json({status:"Ok", deletedPost});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

module.exports = postController;