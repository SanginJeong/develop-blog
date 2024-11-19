import React, { useEffect, useState } from 'react'
import CountDownTimer from './CountDownTimer/CountDownTimer'
import './Todo.style.css';
import { useGetAuthQuery } from '../../hooks/useGetAuth';
import TodoModal from './TodoModal/TodoModal';
import { useGetTaskListQuery } from '../../hooks/useGetTaskList';
import Spinner from '../../common/Spinner/Spinner';
import Error from '../../common/Error/Error';
import { useDeleteTaskQuery } from '../../hooks/useDeleteTask';
import { useUpdateIsDoneQuery } from '../../hooks/useUpdateIsDone';
import TaskList from './TaskList';
import ErrorModal from './ErrorModal/ErrorModal';
const Todo = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAppend, setIsAppend] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {data: authStatus} = useGetAuthQuery();
  const {data: taskList, isLoading, isError, error} = useGetTaskListQuery();
  const { mutate: deleteTask} = useDeleteTaskQuery(setErrorMessage, setErrorModal);
  const { mutate: updateIsDone } = useUpdateIsDoneQuery(setErrorMessage, setErrorModal);

  const handleAppend = () => {
    setIsOpenModal(true);
    setIsAppend(true);
    setTaskId(null);
  }

  const handleDeleteTask = (_id) => {
    deleteTask({_id});
  }

  const handleIsDoneBtn= (_id) => {
    updateIsDone({_id});  
  }

  const handleUpdateTaskTitle = (_id) => {
    setIsAppend(false);
    setTaskId(_id);
    if(authStatus.authenticated) {
      setIsOpenModal(true);
    } else {
      setErrorModal(true);
      setErrorMessage("권한이 없습니다.");
    }
  }

  if(isLoading){
    return <Spinner/>
  }
  if(isError) {
    return <Error error={error}/>
  }
  
  return (
    <div className='todo box'>
      <div className="timer">
        {<CountDownTimer/>}
        {authStatus.authenticated
          ? <button 
              onClick={handleAppend}
              className='append-btn'><i class="fa-solid fa-plus"></i></button>
          : null
        }
      </div>
      <div className='task'>
        <div className="not-done">
          <h4>NOT DONE</h4>
          <TaskList
            tasks={taskList.data.taskList}
            isDone={false}
            handleIsDoneBtn={handleIsDoneBtn}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTaskTitle = {handleUpdateTaskTitle}
          />
        </div>
        <div className="done">
          <h4>DONE</h4>
          <TaskList
            tasks={taskList.data.taskList}
            isDone={true}
            handleIsDoneBtn={handleIsDoneBtn}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTaskTitle = {handleUpdateTaskTitle}
          />
        </div>
      </div>
      
      {isOpenModal 
        ? <TodoModal taskId={taskId} isAppend={isAppend} setIsAppend={setIsAppend} setIsOpenModal={setIsOpenModal}/>
        : null
      }

      {errorModal ? <ErrorModal 
        setErrorModal={setErrorModal} 
        errorMessage={errorMessage}/> : null}
    </div>
  )
}

export default Todo