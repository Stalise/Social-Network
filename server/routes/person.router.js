const Router = require('express');

const personController = require('../controllers/person.controller');
const jwtCheck = require('../middleware/jwtCheck');

const router = new Router();

router.get('/person/posts/:person', jwtCheck, personController.getPosts);
router.get('/person/friends/:username', jwtCheck, personController.getFriends);
router.get('/person/photos/:username', jwtCheck, personController.getPhotos);
router.get('/person/:username', jwtCheck, personController.getPerson);

module.exports = router;
