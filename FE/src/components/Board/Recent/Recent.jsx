import React from 'react'
import { useGetPostListQuery } from '../../../hooks/useGetPostList';
import {useNavigate} from 'react-router-dom';

const Recent = () => {
  const {data, isLoading, isError, error} = useGetPostListQuery();
  const postList = data.newPostList.slice(0,10);
  const navigate = useNavigate();
  return (
    <div className="recent box">
      <h4>최신 글</h4>
      <div className='post-area'>
        {postList?.map((post)=>( 
          <div className='home-post-area' onClick={()=>{navigate(`/contents/${post.category}/${post._id}`)}}>
            <div className="post">{post.title}</div>
            <div className="home-post-time">{post.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recent