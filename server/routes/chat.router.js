const Router = require('express');

const chatController = require('../controllers/chat.controller');
const jwtCheck = require('../middleware/jwtCheck');

const router = new Router();

router.get('/chat/:username', jwtCheck, chatController.getChats);
router.post('/chat', jwtCheck, chatController.createChat);
router.delete('/chat/:id', jwtCheck, chatController.deleteChat);

module.exports = router