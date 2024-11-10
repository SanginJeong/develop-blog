import React, { useState } from 'react'
import './LoginPage.style.css';
import Error from '../../common/Error/Error';
const LoginPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(null);
  const submitLogin = async (e) => {
    e.preventDefault();
    setError(null); // 기존 에러 초기화
    
  };

  return (
    <div className='login-area'>
      <form onSubmit={submitLogin} className='login-form'>
        <h2>로그인</h2>
        <input type="text" value={id} onChange={(e)=>{setId(e.target.value)}} />
        <input type="password" value={pw} onChange={(e)=>{setPw(e.target.value)}} />
        {error ? <Error error = {error}/> : null}
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage