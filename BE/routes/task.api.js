const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.appendTask);
router.get('/', taskController.getTask);
router.put('/:id', taskController.updateIsDone);
router.put('/title/:id', taskController.updateTaskTitle);
router.delete('/:id', taskController.removeTask);

module.exports = router;