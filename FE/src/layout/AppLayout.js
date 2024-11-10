import React from 'react'
import './AppLayout.style.css';
import NavMenu from '../components/NavMenu/NavMenu';
import { Outlet, useNavigate } from 'react-router';

const AppLayout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <h2 onClick={()=>{navigate('/')}}>Developer Jeong</h2>
        <button 
          onClick={()=>{navigate('/login')}}
          className='login-btn'>Log in</button>
      </nav>

      <NavMenu/>

      <div className="wrap">
        <div className="container">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AppLayout