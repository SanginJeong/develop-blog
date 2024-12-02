import React, { useEffect, useState } from 'react'
import CountDownTimer from './CountDownTimer/CountDownTimer'
import './Todo.style.css';
import { useGetAuthQuery } from '../../hooks/useGetAuth';
import TodoModal from './TodoModal/TodoModal';
import { useGetTaskListQuery } from '../../hooks/useGetTaskList';
import Spinner from '../../common/Spinner/Spinner';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import { useDeleteTaskQuery } from '../../hooks/useDeleteTask';
import { useUpdateIsDoneQuery } from '../../hooks/useUpdateIsDone';
import TaskList from './TaskList';
import ErrorModal from '../../common/ErrorModal/ErrorModal';

const Todo = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAppend, setIsAppend] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {data: authStatus} = useGetAuthQuery();
  const {data: taskList, isLoading, isError, error} = useGetTaskListQuery();
  const { mutate: deleteTask} = useDeleteTaskQuery(setErrorMessage, setOpenErrorModal);
  const { mutate: updateIsDone } = useUpdateIsDoneQuery(setErrorMessage, setOpenErrorModal);

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
      setOpenErrorModal(true);
      setErrorMessage("권한이 없습니다.");
    }
  }

  useEffect(()=>{console.log('ddd', openErrorModal);
  },[openErrorModal]);

  if(isLoading){
    return <Spinner/>
  }
  if(isError) {
    return <ErrorComponent error={error}/>
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
      
      {isOpenModal && 
        <TodoModal 
          taskId={taskId} 
          isAppend={isAppend} 
          setIsAppend={setIsAppend} 
          setIsOpenModal={setIsOpenModal}
          setOpenErrorModal={setOpenErrorModal}
          setErrorMessage={setErrorMessage}
          />
      }

      {openErrorModal && 
        <ErrorModal 
          setOpenErrorModal={setOpenErrorModal} 
          errorMessage={errorMessage}
          />
        }
    </div>
  )
}

export default Todo