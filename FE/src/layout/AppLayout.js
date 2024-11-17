import React, { useEffect } from 'react'
import './AppLayout.style.css';
import NavMenu from '../components/NavMenu/NavMenu';
import { Outlet, useNavigate } from 'react-router';
import { useGetAuthQuery } from '../hooks/useGetAuth';
import { useQueryClient } from '@tanstack/react-query';


const AppLayout = () => {
  const navigate = useNavigate();
  const {data:authStatus} = useGetAuthQuery();
  const queryClient = useQueryClient();

  const onClickLogOut = () => {
    sessionStorage.removeItem('token');
    queryClient.invalidateQueries(['getAuth']);
  }

  useEffect(()=>{
    queryClient.invalidateQueries(['getAuth']);
  },[queryClient])

  return (
    <div>
      <nav>
        <h2 onClick={()=>{navigate('/')}}>Developer Jeong</h2>
        {authStatus?.authenticated
        ? <button 
        onClick={onClickLogOut}
        className='login-btn'>Log Out</button>
        : <button 
        onClick={()=>{navigate('/login')}}
        className='login-btn'>Log in</button>}
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