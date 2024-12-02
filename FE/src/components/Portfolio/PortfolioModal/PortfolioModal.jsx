import React,{useState} from 'react'
import {useUpdatePortfolioQuery} from '../../../hooks/useUpdatePortfolio';

const PortfolioModal = ({isAppend,selectedPortfolio,setSelectedPortfolio,setIsOpenModal,handleAppendPortfolio}) => {
  const [title, setTitle] = useState(selectedPortfolio?.title || "");
  const [webURL, setWebURL] = useState(selectedPortfolio?.webURL || "");
  const [gitURL, setGitURL] = useState(selectedPortfolio?.gitURL || "");

  const {mutate: updatePortfolio} = useUpdatePortfolioQuery();

  const onSubmit = (e) => {
    e.preventDefault();
    if(isAppend) { // 새로운 포트폴리오 추가
      handleAppendPortfolio({title,webURL,gitURL});
    } else if(!isAppend) { // 기존 포트폴리오 수정
      const {_id} = selectedPortfolio;
      updatePortfolio({id: _id, title, webURL, gitURL});
    }
    setIsOpenModal(false);
  }

  const handleClickClose = () => {
    setIsOpenModal(false);
    setSelectedPortfolio(null);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isAppend ? 'Add Portfolio' : 'Update Portfolio'}</h2>
        <form onSubmit={onSubmit}>
          <input className='modal-input' value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder='Title...' />
          <input className='modal-input' value={webURL} onChange={(e)=>{setWebURL(e.target.value)}} type="text" placeholder='webUrl...'/>
          <input className='modal-input' value={gitURL} onChange={(e)=>{setGitURL(e.target.value)}} type="text" placeholder='giturl...'/>
          <button className='modal-btn' type='submit'>완료</button>
          <button className='modal-close' type='button' onClick={handleClickClose}>취소</button>
        </form>
      </div>
    </div>
  )
}

export default PortfolioModal