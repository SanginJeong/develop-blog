import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { idToCategory } from '../../constant/idToCategory';
import './WritingPage.style.css';
import { useAppendPostQuery } from '../../hooks/useAppendPost';
import Error from '../../common/Error/Error';
import Spinner from '../../common/Spinner/Spinner';

const WritingPage = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postPassword, setPostPassword] = useState('');
  const {mutate: appendPost, isError, error, isLoading} = useAppendPostQuery();
  const categoryList = Object.keys(idToCategory);
  const navigate = useNavigate();

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    appendPost({category:selectedCategory, title,content,postPassword,author:'정상인'});
    navigate(`/contents/${id}`);      
  };

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <div className="writing-page">
      <h2 className="writing-title">글쓰기</h2>
      <form className="writing-form" onSubmit={handleSubmit}>
        <label htmlFor="category">카테고리</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleChangeCategory}
          className="writing-select"
        >
          {categoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="writing-input"
          placeholder="제목을 입력하세요"
          required
        />

        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="writing-textarea"
          placeholder="내용을 입력하세요"
          rows={10}
          required
        ></textarea>

        <div>
          <label htmlFor="postPassword">게시물 비밀번호</label>
          <div className='post-password-area'>
            <input value={postPassword} onChange={(e)=>{setPostPassword(e.target.value)}} className='post-password' type="password" />
          </div>
          {isError ? <Error error={error}/> : null}
          <div className='writing-btn-area'>
            <button type="submit" className="writing-submit-btn">완료</button>
            <button className='writing-cancel-btn'>취소</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WritingPage;
