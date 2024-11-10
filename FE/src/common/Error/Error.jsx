import React from 'react'
import './Error.style.css';

const Error = ({error}) => {
  return (
    <div className='error-message'>{error.message}</div>
  )
}

export default Error