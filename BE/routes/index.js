const express = require('express');
const router = express.Router();
const userApi = require('./user.api');
const taskApi = require('./task.api');
const postApi = require('./post.api');
const profileApi = require('./profile.api');
const portfolioApi = require('./portfolio.api');

router.use('/user', userApi);
router.use('/task', taskApi);
router.use('/post', postApi);
router.use('/profile', profileApi);
router.use('/portfolio', portfolioApi);

module.exports = router;