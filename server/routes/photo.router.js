const Router = require('express');

const photoController = require('../controllers/photo.controller');
const jwtCheck = require('../middleware/jwtCheck');

const router = new Router();

router.get('/photo', jwtCheck, photoController.getPhotos);
router.post('/photo', jwtCheck, photoController.addPhoto);
router.delete('/photo/:id', jwtCheck, photoController.deletePhoto);

module.exports = router;
