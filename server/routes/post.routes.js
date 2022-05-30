const Router = require('express');
const router = new Router()
const postController = require('../controllers/post.controller');

router.post('/post', postController.createPost)
router.get('/post/:id', postController.getPosts)
router.delete('/post/:id', postController.deletePost)
router.post('/post/like', postController.createLike)
router.get('/post/like/:id', postController.getLikes)

module.exports = router