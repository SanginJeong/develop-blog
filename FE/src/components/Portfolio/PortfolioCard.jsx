import React from 'react'
import { useGetAuthQuery } from '../../hooks/useGetAuth'

const PortfolioCard = ({portfolio,handleDeletePortfolio,handleUpdatePortfolio}) => {
  const {data: authStatus} = useGetAuthQuery();
  return (
    <div className='portfolio-card'>
      <div>
        <a className='portfolio-url' href={portfolio?.webURL} target='_blank'>{portfolio?.title}</a>
        <a className='portfolio-url' href={portfolio?.gitURL} target='_blank'><i class="fa-brands fa-github"></i></a>
        {authStatus?.authenticated && 
          <button onClick={()=>{handleUpdatePortfolio(portfolio._id)}} className='update-btn'><i className="fa-solid fa-pen"></i></button>}
      </div>
      {authStatus?.authenticated && 
        <button onClick={()=>{handleDeletePortfolio(portfolio._id)}} className='delete-btn'><i className="fa-solid fa-trash"></i></button>}
    </div>
  )
}

export default PortfolioCard