import React from 'react'
import './ErrorComponent.style.css';

const ErrorComponent = ({error}) => {
  return (
    <div className='error-message'>{error.message}</div>
  )
}

export default ErrorComponent;