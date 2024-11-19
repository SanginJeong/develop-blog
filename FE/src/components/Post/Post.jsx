import React from 'react';
import './Post.style.css';
import { useNavigate } from 'react-router';

const Post = ({id,title,time,author}) => {
  const navigate = useNavigate();
  return (
    <div className='posting' onClick={()=>{navigate(`${id}`)}}>
      <p className='post-title'>{title}</p>
      <p className='post-time'>{time}</p>
      <p className='post-author'>{author}</p>
    </div>
  );
};

export default Post;