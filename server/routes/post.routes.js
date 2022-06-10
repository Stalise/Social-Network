const Router = require('express');

const postController = require('../controllers/post.controller');
const jwtCheck = require('../middleware/jwtCheck')

const router = new Router()

router.get('/post', jwtCheck, postController.getPosts)
router.post('/post', jwtCheck, postController.createPost)
router.delete('/post/like', jwtCheck, postController.deleteLike)
router.delete('/post/:id', jwtCheck, postController.deletePost)
router.post('/post/like', jwtCheck, postController.createLike)

// router.post('/post', postController.createPost)
// router.get('/post/:id', postController.getPosts)
// router.delete('/post/:id', postController.deletePost)
// router.post('/post/like', postController.createLike)
// router.get('/post/like/:id', postController.getLikes)

module.exports = router