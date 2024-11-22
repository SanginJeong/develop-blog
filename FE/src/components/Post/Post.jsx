import React from 'react';
import './Post.style.css';

const Post = ({id,title,time,author,handleClickPostDetail,isDeleteMode, setSelectedMode}) => {

  const handleCheck = (e) => {
    e.stopPropagation();
  }

  return (
    <div className='posting' onClick={handleClickPostDetail}>
      {isDeleteMode 
        ? <input 
            type="checkbox" 
            className='delete-checkbox' 
            onChange={handleCheck} />
             
        : null
        }
      <p className='post-title'>{title}</p>
      <p className='post-time'>{time}</p>
      <p className='post-author'>{author}</p>
    </div>
  );
};

export default Post;