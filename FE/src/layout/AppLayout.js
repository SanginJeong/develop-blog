import React, { useEffect, useState } from 'react'
import './AppLayout.style.css';
import NavMenu from '../components/NavMenu/NavMenu';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useGetAuthQuery } from '../hooks/useGetAuth';
import { useQueryClient } from '@tanstack/react-query';


const AppLayout = () => {
  const [isOpenMenuBar, setIsOpenMenuBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
        <button onClick={() => setIsOpenMenuBar(!isOpenMenuBar)} className='hamburger-btn'><i class="fa-solid fa-bars"></i></button>
        <h2 onClick={()=>{navigate('/')}}>Developer Jeong</h2>
        {authStatus?.authenticated
        ? <button 
        onClick={onClickLogOut}
        className='login-btn'>Log Out</button>
        : <button 
        onClick={()=>{navigate('/login', {state : {prevURL : location.pathname}})}}
        className='login-btn'>Log in</button>}
      </nav>
      
      <NavMenu isOpen = {isOpenMenuBar}/>

      <div className="wrap">
        <div className="container">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AppLayout