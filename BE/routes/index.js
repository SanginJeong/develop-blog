const express = require('express');
const router = express.Router();
const userApi = require('./user.api');
const taskApi = require('./task.api');
const postApi = require('./post.api');

router.use('/user', userApi);
router.use('/task', taskApi);
router.use('/post', postApi);

module.exports = router;