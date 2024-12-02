const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const authController = require('../controllers/auth.controller');

router.post('/', authController.authenticate , profileController.updateProfile);
router.get('/', profileController.getProfile);

module.exports = router;