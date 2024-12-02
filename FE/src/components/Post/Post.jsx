import React, {useState} from 'react';
import './Post.style.css';
import { useUpdateFixPostQuery } from '../../hooks/useUpdateFixPost';

const Post = ({postId,title,time,author,isFixed,handleClickPostDetail,isDeleteMode,setSelectedPost}) => {
  
  const {mutate: updateFixPost} = useUpdateFixPostQuery();

  const handleCheck = (e) => {
    if(e.target.checked){
      setSelectedPost((prev)=>[...new Set([...prev, postId])]);
    } else {
      setSelectedPost((prev)=>prev.filter((id)=>id !== postId));
    }
  }

  const handleClick = (e) => {
    if(isDeleteMode) {
      e.stopPropagation();
      return;
    }
    handleClickPostDetail();
  }

  const handleUpdateFix = (e) => {
    e.stopPropagation();
    updateFixPost(postId);
  }

  return (
    <div className='posting' onClick={handleClick}>
      {isDeleteMode 
        ? 
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="delete-checkbox"
              onClick={(e) => e.stopPropagation()}
              onChange={handleCheck}
            />
          </label>
        : null
        }
      <p className='post-title'>{title}</p>
      <p className='post-time'>{time}</p>
      <p className='post-author'>{author}</p>
      <button 
        onClick={handleUpdateFix} 
        className='post-fix'>
        {isDeleteMode 
          ? null 
          : isFixed
            ? <i class="fa-solid fa-star"></i> 
            : <i class="fa-regular fa-star"></i>
        }
      </button>
    </div>
  );
};

export default Post;