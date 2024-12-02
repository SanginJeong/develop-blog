import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { idToCategory } from '../../constant/idToCategory';
import './WritingPage.style.css';
import { useAppendPostQuery } from '../../hooks/useAppendPost';
import Error from '../../common/ErrorComponent/ErrorComponent';
import Spinner from '../../common/Spinner/Spinner';
import ReactQuill from 'react-quill';
import { modules } from '../../constant/EditorModules';
import 'react-quill/dist/quill.snow.css';

const WritingPage = () => {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {mutate: appendPost, isError, error, isLoading} = useAppendPostQuery();
  const categoryList = Object.keys(idToCategory);
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    appendPost({category:selectedCategory, title,content});
    navigate(state.prevURL);
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
        <ReactQuill modules={modules} value={content} onChange={setContent} theme='snow' placeholder='내용을 입력하세요'/>
        <div>
          {isError ? <Error error={error}/> : null}
          <div className='writing-btn-area'>
            <button type="submit" className="writing-submit-btn">완료</button>
            <button onClick={()=>{navigate(state.prevURL);}} className='writing-cancel-btn'>취소</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WritingPage;
