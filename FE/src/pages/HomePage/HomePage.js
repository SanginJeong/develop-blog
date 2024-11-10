import React from 'react'
import './HomePage.style.css';
import Todo from '../../components/Todo/Todo';
import Portfolio from '../../components/Portfolio/Portfolio';
import Diary from '../../components/Board/Diary/Diary';
import Recent from '../../components/Board/Recent/Recent';
import Profile from '../../components/Profile/Profile';

const HomePage = () => {
  return (
    <div className='home-layout'>
      <div className='home-first-line'>
        <Profile/>
        <Portfolio/>
      </div>
      <div className='home-second-line'>
        <Todo/>
        <Recent/>
        <Diary/>
      </div>
    </div>
  )
}

export default HomePage