import React from 'react'
import './ErrorModal.style.css';

const ErrorModal = ({errorMessage,setErrorModal}) => {
  return (
    <div className="errorModal">
      <div className="errorModal-content">
        <p>{errorMessage}</p>
        <button onClick={() => setErrorModal(false)}>닫기</button>
      </div>
    </div>
  )
}

export default ErrorModal