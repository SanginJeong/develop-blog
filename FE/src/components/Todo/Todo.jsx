import React from 'react'
import CountDownTimer from './CountDownTimer/CountDownTimer'
import './Todo.style.css';

const Todo = () => {
  return (
    <div className='todo box'>
      <div className="timer">
        {<CountDownTimer/>}
      </div>

      <div className='task'>
        <div className="not-done">
          <h4>NOT DONE</h4>
        </div>
        <div className="done">
          <h4>DONE</h4>
        </div>
      </div>
    </div>
  )
}

export default Todo