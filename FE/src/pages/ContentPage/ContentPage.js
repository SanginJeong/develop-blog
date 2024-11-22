import React,{useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import './ContentPage.style.css';
import Post from '../../components/Post/Post';
import { idToCategory } from '../../constant/idToCategory';
import { useGetPostListQuery } from '../../hooks/useGetPostList';
import Spinner from '../../common/Spinner/Spinner';
import {useGetAuthQuery} from '../../hooks/useGetAuth';
import ErrorModal from '../../components/Todo/ErrorModal/ErrorModal';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';

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

  
  const handleDeletePost = () => {
    try {
      if(!authStatus.authenticated) {
        throw new Error("권한이 없습니다.")
      }
      setIsDeleteMode(true);
    } catch (error) {
      
    }
  }
  
  const handleClickPostDetail = (postId) => {
    navigate(`/contents/${categoryId}/${postId}`,{state:{prevURL : location.pathname}})
  }
  
  if(isLoading){
    return <Spinner/>
  }
  if(isError) {
    return <ErrorComponent error={error}/>
  }
  
  return (
    <div>
      <div className='category-area'>
        <h2>{`${category}(${postList?.length})`}</h2>
        <div>
          <button onClick={handleDeletePost} className='post-btn delete'>삭제</button>
          <button onClick={handleAppendPost} className='post-btn append'>글쓰기</button>
        </div>
      </div>

      <div>
        {postList?.length === 0 
          ? <h3>등록된 게시물이 없습니다.</h3> 
          : null}
        {postList?.map((post)=>(
          <Post 
            id={post._id}
            title = {post.title} 
            time = {post.time} 
            author={post.author}
            isDeleteMode = {isDeleteMode}
            setSelectedPost={setSelectedPost}
            handleClickPostDetail = {()=>{handleClickPostDetail(post._id)}}
            />
        ))}
      </div>
      { openErrorModal ? <ErrorModal errorMessage={errorMessage} setOpenErrorModal={setOpenErrorModal}/> : null }
    </div>
  )
}

export default ContentPage