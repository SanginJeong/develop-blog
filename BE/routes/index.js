const express = require('express');
const router = express.Router();
const userApi = require('./user.api');
const taskApi = require('./task.api');

router.use('/user', userApi);
router.use('/task', taskApi);

module.exports = router;