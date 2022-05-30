const Router = require('express');
const router = new Router()
const userController = require('../controllers/user.controller');

router.post('/user', userController.createUser)
router.post('/user/check', userController.checkUser)
router.get('/user/:username', userController.getUser)
router.get('/user/likes/:id', userController.getLikes)
router.put('/user', userController.updateUser)

module.exports = router