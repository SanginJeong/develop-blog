import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Profile.style.css';
import Spinner from '../../common/Spinner/Spinner';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import DOMPurify from 'dompurify';
import { modules } from '../../constant/EditorModules';
import { useGetProfileQuery } from '../../hooks/useGetProfile';
import { useUpdateProfileQuery } from '../../hooks/useUpdateProfile';
import { useGetAuthQuery } from '../../hooks/useGetAuth';

const Profile = () => {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const {data: profile, isLoading, isError, error} = useGetProfileQuery(); 
  const {data: authStatus} = useGetAuthQuery();
  const {mutate: updateProfile} = useUpdateProfileQuery();
  const sanitizedContent = profile?.content ? DOMPurify.sanitize(profile.content) : '';

  const handleUpdateProfile = () => {
    if(isEditing) {
      updateProfile(content);
    }
    setIsEditing(!isEditing);
  }

  // content를 초기에 설정해줘야 편집눌렀을 때 해당 content가 에디터에 보이기 위함
  useEffect(()=>{
    setContent(profile?.content);
  },[profile])

  if(isLoading) {
    return <Spinner/>
  }

  if(isError) {
    return <ErrorComponent error={error}/>
  } 
  return (
    <div className="profile box">
      <h4>프로필</h4>
      {authStatus.authenticated 
        ? <button className='profile-update-btn' type='button' onClick={handleUpdateProfile}>{isEditing ? "저장하기" : "수정하기"}</button>
        : null
      }
      {isEditing 
        ? <div className='editor-area'>
            <ReactQuill modules={modules} value={content} onChange={setContent} theme='snow'/>
          </div> 
        :
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        }
    </div>
  );
};

export default Profile;
