import React, { useEffect, useState } from 'react';
import './PostDetailPage.style.css';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useGetPostDetailQuery } from '../../hooks/useGetPostDetail';
import Spinner from '../../common/Spinner/Spinner';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import { useGetAuthQuery } from '../../hooks/useGetAuth';
import ErrorModal from '../../common/ErrorModal/ErrorModal';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const PostDetailPage = () => {
  const { categoryId, postId } = useParams();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { data: authStatus } = useGetAuthQuery();
  const { data: postDetail, isLoading, isError, error } = useGetPostDetailQuery(postId);
  
  const sanitizedContent = postDetail?.post?.content ? DOMPurify.sanitize(postDetail.post.content) : '';

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const prevURL = state?.prevURL || `/contents/${categoryId}`;

  const handleClickUpdate = () => {
    try {
      if (!authStatus.authenticated) {
        throw new Error("권한이 없습니다.");
      }
      navigate('update', { state: { prevURL: location.pathname } });
    } catch (error) {
      setOpenErrorModal(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (postDetail) {
      const contentElement = document.querySelector('.post-detail-content');
      
      const preBlocks = contentElement?.querySelectorAll('pre');
      preBlocks?.forEach((preBlock) => {
        const codeBlock = preBlock.querySelector('code');
        if (!codeBlock) {
          const newCodeBlock = document.createElement('code');
          newCodeBlock.innerHTML = preBlock.innerHTML;
          preBlock.innerHTML = ''; // 기존 내용 비우기
          preBlock.appendChild(newCodeBlock); // 새로운 code 태그 추가
        }
      });

      // hljs 하이라이팅 적용
      const codeBlocks = document.querySelectorAll('.post-detail-content pre code');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block); // highlightElement로 하이라이팅 적용
      });
    }
  }, [postDetail]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div>
      <h2 className='post-detail-title'>{postDetail?.post.title}</h2>
      <div
        className="post-detail-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
      <div className='post-detail-btn-area'>
        <button className='post-btn update' onClick={handleClickUpdate}>수정하기</button>
        <button className='post-btn' onClick={() => { navigate(prevURL) }}>돌아가기</button>
      </div>

      {openErrorModal 
        ? <ErrorModal setOpenErrorModal={setOpenErrorModal} errorMessage={errorMessage} />
        : null}
    </div>
  );
};

export default PostDetailPage;
