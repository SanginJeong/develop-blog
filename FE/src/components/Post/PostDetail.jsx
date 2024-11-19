import React, { useEffect } from 'react'
import './PostDetail.style.css';
import { useParams } from 'react-router';
import { useGetPostDetailQuery } from '../../hooks/useGetPostDetail';
import Spinner from '../../common/Spinner/Spinner';
import Error from '../../common/Error/Error';
const PostDetail = () => {
  const {id} = useParams();
  const {data:postDetail, isLoading, isError, error} = useGetPostDetailQuery(id);

  if(isLoading){
    return <Spinner/>
  }

  if(isError){
    return <Error error={error}/>
  }

  return (
    <div>
      <h2 className='post-detail-title'>{postDetail?.post.title}</h2>
      <h4 className='post-detail-content'>{postDetail?.post.content}</h4>
    </div>
  )
}

export default PostDetail