const Router = require('express');
const router = new Router()
const newsController = require('../controllers/news.controller');

router.get('/news/:id', newsController.getNews)

module.exports = router