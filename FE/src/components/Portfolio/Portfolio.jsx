import React, { useState } from 'react'
import './Portfolio.style.css';
import PortfolioCard from './PortfolioCard';
import PortfolioModal from './PortfolioModal/PortfolioModal';
import Spinner from '../../common/Spinner/Spinner';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import { useGetAuthQuery } from '../../hooks/useGetAuth';
import { useGetPortfolioListQuery } from '../../hooks/useGetPorfolioList';
import { useAppendPortfolioQuery } from '../../hooks/useAppendPortfolio';
import { useDeletePortfolioQuery } from '../../hooks/useDeletePortfolio';

const Portfolio = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAppend, setIsAppend] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState('');
  const {data: authStatus} = useGetAuthQuery();
  const {mutate: appendPortfolio} = useAppendPortfolioQuery();
  const {mutate: deletePortfolio} = useDeletePortfolioQuery();
  const {data, isLoading,isError, error} = useGetPortfolioListQuery();
  const portfolioList = data?.portfolioList;

  const handleClickAppend = () => {
    setIsAppend(true);
    setIsOpenModal(true);
  }
  const handleAppendPortfolio = (newPortfolio) => {
    appendPortfolio(newPortfolio);
  }

  const handleDeletePortfolio = (id) => {
    deletePortfolio(id);
  }

  const handleUpdatePortfolio = (id) => {
    const selected = portfolioList?.find((portfolio)=>portfolio._id === id);
    setSelectedPortfolio(selected);
    setIsAppend(false);
    setIsOpenModal(true);
  }

  if(isLoading) {
    return <Spinner/>
  }

  if(isError) {
    return <ErrorComponent error={error}/>
  }

  return (
    <div className='portfolio box'>
      <div className='portfolio-top'>
        <h4>포트폴리오</h4>
        {authStatus?.authenticated && 
          <button 
            className='append-btn' 
            onClick={handleClickAppend}>
              <i class="fa-solid fa-plus"></i></button>}        
      </div>
        {isOpenModal && 
          <PortfolioModal
            isAppend = {isAppend}
            selectedPortfolio = {selectedPortfolio}
            setSelectedPortfolio = {setSelectedPortfolio}
            handleAppendPortfolio={handleAppendPortfolio}
            handleUpdatePortfolio={handleUpdatePortfolio}
            setIsOpenModal={setIsOpenModal}/>}
      <div className='post-area'>
        {portfolioList?.map((portfolio)=>
          <PortfolioCard 
            portfolio={portfolio} 
            handleUpdatePortfolio={handleUpdatePortfolio} 
            handleDeletePortfolio={handleDeletePortfolio}/>)}
      </div>
    </div>
  )
}

export default Portfolio