const Router = require('express');

const friendController = require('../controllers/friend.controller');
const jwtCheck = require('../middleware/jwtCheck')

const router = new Router()


router.post('/friend', friendController.createFriend)
// router.get('/friend/status', friendController.getStatus)
// router.get('/friend/:id', friendController.getFriends)
// router.put('/friend/status', friendController.changeStatus)
// router.put('/friend/accept', friendController.acceptFriend)
// router.delete('/friend/reject', friendController.rejectFriend)
// router.delete('/friend', friendController.deleteFriend)

module.exports = router