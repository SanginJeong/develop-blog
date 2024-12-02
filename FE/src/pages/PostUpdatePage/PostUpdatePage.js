import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { idToCategory } from '../../constant/idToCategory';
import Error from '../../common/ErrorComponent/ErrorComponent';
import Spinner from '../../common/Spinner/Spinner';
import { useGetPostDetailQuery } from '../../hooks/useGetPostDetail';
import { useUpdatePostQuery } from '../../hooks/useUpdatePost';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../../constant/EditorModules';

const PostUpdatePage = () => {
  const { postId } = useParams();
  const {data: postDetail,isLoading,isError,error} = useGetPostDetailQuery(postId);
  const {mutate : updatePost} = useUpdatePostQuery();
  const [selectedCategory, setSelectedCategory] = useState(postDetail.post.category);
  const [title, setTitle] = useState(postDetail?.post.title);
  const [content, setContent] = useState(postDetail?.post.content);
  const categoryList = Object.keys(idToCategory);
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({postId, title, content, category: selectedCategory});
    navigate(state.prevURL);
  };

  if(isLoading) {
    return <Spinner/>
  }

  if(isError) {
    return <ErrorComponent erorr={error}/>
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
        <ReactQuill modules={modules} theme='snow' value={content} onChange={setContent}/>
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

export default PostUpdatePage;
