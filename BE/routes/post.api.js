const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authController = require('../controllers/auth.controller');

router.post('/', authController.authenticate, postController.appendPost);
router.get('/', postController.getPost);
router.get('/:postId', postController.getPostDetail);
router.put('/:postId', authController.authenticate, postController.updatePost);
router.put('/fix/:postId', authController.authenticate, postController.updateFixPost);
router.delete('/:selectedPost', authController.authenticate, postController.deletePost);
module.exports = router;
