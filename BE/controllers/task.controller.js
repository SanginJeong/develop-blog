const Task = require('../model/Task');

const taskController = {};

taskController.appendTask = async(req,res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({title, isDone: false});
    await newTask.save();
    res.status(200).json({status: "Ok", newTask});

  } catch (error) {
    res.status(400).json({status: "Fail", message: error.message});
  }
}

taskController.updateIsDone = async(req, res) => {
  try {
    const {id} = req.params;
    
    if(!id) {
      throw new Error("해당 id를 찾을 수 없습니다.");
    }
    const onClickedTask = await Task.findById(id);
    
    const updatedTask = await Task.updateOne({_id: id}, {isDone : !onClickedTask.isDone});
    
    res.status(200).json({status:"Ok", updatedTask});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

taskController.updateTaskTitle = async(req,res) => {
  try {
    const {id} = req.params;
    if(!id) {
      throw new Error("해당 id를 찾을 수 없습니다.");
    }
    const {title} = req.body;
    if(!title) {
      throw new Error("변경제목을 찾을 수 없습니다.");
    }
    const updatedTaskTitle = await Task.updateOne({_id : id}, {title});
    res.status(200).json({status: "Ok", updatedTaskTitle});
  } catch (error) {
    res.status(400).json({statis:"Fail", message: error.message})
  }
}

taskController.removeTask = async(req, res) => {
  try {
    const {id} = req.params;
    
    if(!id){
      throw new Error("해당 id를 찾을 수 없습니다.");
    }
    const newTaskList = await Task.deleteOne({_id : id});
    res.status(200).json({status: "Ok", newTaskList});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

taskController.getTask = async(req, res) => {
  try {
    const taskList = await Task.find({});
    console.log(taskList);
    
    res.status(200).json({status:"Ok",taskList});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

module.exports = taskController;