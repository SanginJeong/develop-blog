import React, { useState } from 'react'
import './LoginPage.style.css';
import Error from '../../common/Error/Error';
import api from '../../utils/api';
import { useUserLoginQuery } from '../../hooks/useUserLogin';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  
  const {mutate, isError, error} = useUserLoginQuery();
  
  const submitLogin = async (e) => {
    e.preventDefault();
    // setError(null); // 기존 에러 초기화
    mutate({email, password});

    };

  return (
    <div className='login-area'>
      <form onSubmit={submitLogin} className='login-form'>
        <h2>로그인</h2>
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        {error ? <Error error = {error}/> : null}
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage