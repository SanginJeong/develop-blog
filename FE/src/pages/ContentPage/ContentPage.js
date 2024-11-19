import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import './ContentPage.style.css';
import Post from '../../components/Post/Post';
import { idToCategory } from '../../constant/idToCategory';
import { useGetPostListQuery } from '../../hooks/useGetPostList';
import Spinner from '../../common/Spinner/Spinner';
import Error from '../../common/Error/Error';

const ContentPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const category = idToCategory[id];
  const {data, isError, isLoading, error} = useGetPostListQuery();
  
  const postList = data?.newPostList?.filter((post)=>post.category === id);
  
  if(isLoading){
    return <Spinner/>
  }

  if(isError){
    return <Error error={error}/>
  }

  return (
    <div>
      <div className='category-area'>
        <h2>{`${category}(${postList?.length})`}</h2>
        <button onClick={()=>{navigate(`/contents/${id}/writing`)}} className='add-post-btn'>글쓰기</button>
      </div>

      <div>
        {postList?.length === 0 
          ? <h3>등록된 게시물이 없습니다.</h3> 
          : null}
        {postList?.map((post)=>(
          <Post id={post._id} title = {post.title} time = {post.time} author={post.author}/>
        ))}
      </div>
    </div>
  )
}

export default ContentPage