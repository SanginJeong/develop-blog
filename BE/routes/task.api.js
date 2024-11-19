const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authController = require('../controllers/auth.controller');

router.post('/', authController.authenticate ,taskController.appendTask);
router.get('/', taskController.getTask);
router.put('/:id', authController.authenticate ,taskController.updateIsDone);
router.put('/title/:id', authController.authenticate ,taskController.updateTaskTitle);
router.delete('/:id', authController.authenticate ,taskController.removeTask);

module.exports = router;