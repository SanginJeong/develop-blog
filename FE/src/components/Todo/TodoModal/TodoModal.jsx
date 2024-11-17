import React, {useEffect, useState} from 'react'
import './TodoModal.style.css';
import { useAppendTaskQuery } from '../../../hooks/useAppendTask';
import { useUpdateTaskTitleQuery } from '../../../hooks/useUpdateTaskTitle';
import { useGetTaskListQuery } from '../../../hooks/useGetTaskList';

const TodoModal = ({taskId,isAppend,setIsAppend,setIsOpenModal}) => {
  // 만약 isAppend 가 true : 할 일 새로 추가하는 기능을 사용
  // 만약 isAppend 가 false : 할 일 제목 업데이트 하는 기능 사용
  const [title, setTitle] = useState('');
  
  const {mutate : appendTask} = useAppendTaskQuery();
  const {mutate : updateTaskTitle} = useUpdateTaskTitleQuery();
  const {data : taskList} = useGetTaskListQuery();

  useEffect(()=>{
    if(!isAppend && taskId) {
      const task = taskList.data.taskList.find((task)=>task._id === taskId);
      setTitle(task.title);
    }
  },[isAppend, taskId])


  const closeModal = () => {
    setIsOpenModal(false);
    setIsAppend(true);
    setTitle('');
  }

  const submitTitle = (e) => {
    e.preventDefault();
    if(isAppend) {
      appendTask({title});
    } else {
      updateTaskTitle({id : taskId, title})
    }
    setIsOpenModal(false);
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isAppend ? 'Add Task' : 'Update Task'}</h2>
        <form onSubmit={submitTitle}>
          <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder="Enter your task" className="modal-input" />
          <button type='submit' className="modal-btn">Save</button>
          <button className="modal-close" onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default TodoModal