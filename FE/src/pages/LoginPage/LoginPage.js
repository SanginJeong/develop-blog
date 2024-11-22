import React, { useState } from 'react'
import './LoginPage.style.css';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import { useUserLoginQuery } from '../../hooks/useUserLogin';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {mutate, isError, error} = useUserLoginQuery();
  
  const submitLogin = async (e) => {
    e.preventDefault();
    mutate({email, password});
    
    };

  return (
    <div className='login-area'>
      <form onSubmit={submitLogin} className='login-form'>
        <h2>로그인</h2>
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        {error ? <ErrorComponent error = {error}/> : null}
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage