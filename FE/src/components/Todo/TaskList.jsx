const TaskList = ({ tasks, isDone, handleIsDoneBtn, handleDeleteTask, handleUpdateTaskTitle }) => {
  return (
    <div>
      {tasks
        .filter((task) => task.isDone === isDone)
        .map((task) => (
          <div className="task-contents">
            <div className={`task-title ${isDone ? 'doned' : ''}`}>
              <p>{task.title}</p>
              <button onClick={()=>{handleUpdateTaskTitle(task._id)}} className="update-btn">
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
            <div className="task-btn-area">
              <button onClick={() => {handleIsDoneBtn(task._id);}} className="done-btn">
                <i className={`fa-regular ${isDone ? 'fa-circle-check' : 'fa-circle'}`}></i>
              </button>
              <button onClick={() => {handleDeleteTask(task._id)}} className="delete-btn">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;