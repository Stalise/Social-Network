const Router = require('express');
const router = new Router()
const searchController = require('../controllers/search.controller');

router.get('/search/one/:username', searchController.oneUser)
router.get('/search/:id', searchController.allUsers)

module.exports = router