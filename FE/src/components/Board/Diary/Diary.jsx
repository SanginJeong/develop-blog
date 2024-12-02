import React from 'react'
import { useGetPostListQuery } from '../../../hooks/useGetPostList'
import { useLocation, useNavigate } from 'react-router';
import Spinner from '../../../common/Spinner/Spinner';
import ErrorComponent from '../../../common/ErrorComponent/ErrorComponent';
import { truncateText } from '../../../constant/TruncateText ';

const Diary = () => {
  const {data,isLoading,isError,error} =  useGetPostListQuery();
  const postList = data?.sortedPostList.filter((post)=>post.category === 'diary');
  const navigate = useNavigate();
  const location = useLocation();

  if(isLoading) {
    return <Spinner/>
  }

  if(isError) {
    return <ErrorComponent error = {error}/>
  }

  return (
    <div className="diary box">
      <h4>개발일지</h4>
      <div className='post-area'>
        {postList?.map((post)=>( 
          <div className='home-post-area' 
            onClick={()=>{navigate(`/contents/${post.category}/${post._id}`
            ,{state: {prevURL : location.pathname}})}}>
            <div className="post">{truncateText(post.title, 15)}</div>
            <div className="home-post-time">{post.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diary