const Router = require('express');

const postController = require('../controllers/post.controller');
const jwtCheck = require('../middleware/jwtCheck')

const router = new Router()

router.get('/post', jwtCheck, postController.getPosts)
router.post('/post', jwtCheck, postController.createPost)

// router.post('/post', postController.createPost)
// router.get('/post/:id', postController.getPosts)
// router.delete('/post/:id', postController.deletePost)
// router.post('/post/like', postController.createLike)
// router.get('/post/like/:id', postController.getLikes)

module.exports = router