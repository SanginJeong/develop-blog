const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/', postController.appendPost);
router.get('/', postController.getPost);
router.get('/:id', postController.getPostDetail);
module.exports = router;
