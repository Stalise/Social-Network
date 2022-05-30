const Router = require('express');
const router = new Router()
const friendController = require('../controllers/friend.controller');

router.post('/friend', friendController.createFriend)
router.get('/friend/status', friendController.getStatus)
router.get('/friend/:id', friendController.getFriends)
router.put('/friend/status', friendController.changeStatus)
router.put('/friend/accept', friendController.acceptFriend)
router.delete('/friend/reject', friendController.rejectFriend)
router.delete('/friend', friendController.deleteFriend)

module.exports = router