import React,{useEffect, useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import './ContentPage.style.css';
import Post from '../../components/Post/Post';
import { idToCategory } from '../../constant/idToCategory';
import Spinner from '../../common/Spinner/Spinner';
import ErrorModal from '../../common/ErrorModal/ErrorModal';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import { useGetAuthQuery } from '../../hooks/useGetAuth';
import { useGetPostListQuery } from '../../hooks/useGetPostList';
import { useDeletePostQuery } from '../../hooks/useDeletePost';

const ContentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {categoryId} = useParams();
  const category = idToCategory[categoryId];
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState([]);

  const {data, isLoading,error,isError} = useGetPostListQuery();
  const {data:authStatus} = useGetAuthQuery();
  const {mutate: deletePost} = useDeletePostQuery();
  
  const postList = data?.newPostList?.filter((post)=>post.category === categoryId);

  const handleAppendPost = () => {
    try {
      if(!authStatus.authenticated) {
        throw new Error("권한이 없습니다.");
      }
      navigate(`/contents/${categoryId}/writing`,{state: {prevURL : location.pathname}});
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorModal(true);
    }
  }

  
  const handleDeleteMode = () => {
    try {
      if(!authStatus.authenticated) {
        throw new Error("권한이 없습니다.")
      }
      setIsDeleteMode(true);
    } catch (error) {
    }
  }
  
  const handleDeletePost = () => {
    deletePost(selectedPost);
    setIsDeleteMode(false);
  }

  const handleClickPostDetail = (postId) => {
    navigate(`/contents/${categoryId}/${postId}`,{state:{prevURL : location.pathname}})
  }
  

  useEffect(()=>{
    setIsDeleteMode(false);
  },[location.pathname])


  if(isLoading){
    return <Spinner/>
  }
  if(isError) {
    return <ErrorComponent error={error}/>
  }
  

  return (
    <div>
      <div className='category-area'>
        <h2>{`${category}  (${postList?.length})`}</h2>
        <div>
          <button onClick={handleDeleteMode} className='post-btn delete'>삭제</button>
          <button onClick={handleAppendPost} className='post-btn append'>글쓰기</button>
        </div>
      </div>

      <div>
        {postList?.length === 0 
          ? <h3>등록된 게시물이 없습니다.</h3> 
          : null}
        {postList?.map((post)=>(
          <Post 
            postId={post._id}
            title = {post.title} 
            time = {post.time} 
            author={post.author}
            isFixed={post.isFixed}
            isDeleteMode = {isDeleteMode}
            setSelectedPost={setSelectedPost}
            handleClickPostDetail = {()=>{handleClickPostDetail(post._id)}}
            />
        ))}

        {isDeleteMode
          ? 
            <div className='post-btn-area'>
              <button 
                onClick={handleDeletePost}
                className='post-btn'>완료
              </button>
              <button 
                className='post-btn'
                onClick={()=>{setIsDeleteMode(false)}}>취소
              </button>
            </div>
          : null
        }
      </div>
      { openErrorModal ? <ErrorModal errorMessage={errorMessage} setOpenErrorModal={setOpenErrorModal}/> : null }
    </div>
  )
}

export default ContentPage