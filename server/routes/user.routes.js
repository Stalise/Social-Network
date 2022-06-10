const Router = require('express');

const userController = require('../controllers/user.controller');
const jwtCheck = require('../middleware/jwtCheck')

const router = new Router()

router.post('/user', userController.regUser)
// router.get('/user/:id', jwtCheck, userController)
router.get('/user/auth', jwtCheck, userController.checkAuthUser)
router.post('/user/auth', userController.authUser)
router.get('/user/logout', userController.logoutUser)
router.get('/user/:username', jwtCheck, userController.getUser)

// router.get('/user', jwtCheck, userController.checkUser)
// router.post('/user', userController.createUser)
// router.post('/user/check', userController.checkUser)
// router.get('/user/:username', userController.getUser)
// router.get('/user/likes/:id', userController.getLikes)
// router.put('/user', userController.updateUser)

module.exports = router