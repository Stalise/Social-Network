const Router = require('express');

const userController = require('../controllers/user.controller');
const jwtCheck = require('../middleware/jwtCheck');

const router = new Router();

router.post('/user', userController.regUser);
// router.get('/user/:id', jwtCheck, userController)
router.get('/user/auth', jwtCheck, userController.checkAuthUser);
router.post('/user/auth', userController.authUser);
router.get('/user/logout', userController.logoutUser);
router.get('/user/:username', jwtCheck, userController.getUser);

module.exports = router;
