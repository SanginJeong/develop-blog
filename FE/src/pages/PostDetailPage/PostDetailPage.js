import React, { useState } from 'react'
import './PostDetailPage.style.css';
import { useLocation, useNavigate, useParams } from 'react-router';
import {useGetPostDetailQuery} from '../../hooks/useGetPostDetail';
import Spinner from '../../common/Spinner/Spinner';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import { useGetAuthQuery } from '../../hooks/useGetAuth';
import ErrorModal from '../../components/Todo/ErrorModal/ErrorModal';

const PostDetailPage = () => {
  const {categoryId, postId} = useParams();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {data: authStatus} = useGetAuthQuery();
  const {data:postDetail, isLoading, isError, error} = useGetPostDetailQuery(postId);
  
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const prevURL = state?.prevURL || `/contents/${categoryId}`

  const handleClickUpdate = () => {
    try {
      if(!authStatus.authenticated){
        throw new Error("권한이 없습니다.");
      }
      navigate('update', {state: {prevURL: location.pathname}});
    } catch (error) {
      setOpenErrorModal(true);
      setErrorMessage(error.message);
    }
  }
  if(isLoading){
    return <Spinner/>
  }

  if(isError){
    return <ErrorComponent error={error}/>
  }

  return (
    <div>
      <h2 className='post-detail-title'>{postDetail?.post.title}</h2>
      <h4 className='post-detail-content'>{postDetail?.post.content}</h4>
      <div>
        <button className='post-btn update' onClick={handleClickUpdate}>수정하기</button>
        <button className='post-btn' onClick={()=>{navigate(prevURL)}}>돌아가기</button>
      </div>

      {openErrorModal 
        ? <ErrorModal setOpenErrorModal={setOpenErrorModal} errorMessage={errorMessage}/>
        : null
        }
    </div>
  )
}

export default PostDetailPage;