const Router = require('express');
const router = new Router()
const chatController = require('../controllers/chat.controller');

router.get('/chat/join', chatController.chatJoin)
router.get('/chat/all/:id', chatController.chatAll)
router.delete('/chat', chatController.delChat)
router.get('/messages', chatController.getMessages)
router.get('/message-one/:id', chatController.getMessageOne)
router.post('/messages', chatController.createMessages)

// router.get('/chat', friendController.getStatus)

module.exports = router