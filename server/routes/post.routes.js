const Router = require('express');

const postController = require('../controllers/post.controller');
const jwtCheck = require('../middleware/jwtCheck')

const router = new Router()

router.get('/post', jwtCheck, postController.getPosts)
router.post('/post', jwtCheck, postController.createPost)
router.delete('/post/like', jwtCheck, postController.deleteLike)
router.delete('/post/:id', jwtCheck, postController.deletePost)
router.post('/post/like', jwtCheck, postController.createLike)

module.exports = router