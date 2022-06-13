const Router = require('express');

const friendController = require('../controllers/friend.controller');
const jwtCheck = require('../middleware/jwtCheck')

const router = new Router()

router.get('/friend/:username', jwtCheck, friendController.getFriends)
router.post('/friend', jwtCheck, friendController.createFriend)
router.patch('/friend', jwtCheck, friendController.acceptFriend)
router.delete('/friend', jwtCheck, friendController.deleteFriend)

module.exports = router