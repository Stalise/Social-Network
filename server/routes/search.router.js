const Router = require('express');

const searchController = require('../controllers/search.controller');

const router = new Router();

router.get('/search', searchController.allUsers);
router.get('/search/one/:username', searchController.oneUser);

module.exports = router;
