const Router = require('express');
const router = new Router()
const photoController = require('../controllers/photo.controller');

router.post('/photos', photoController.createPhoto)
router.get('/photos/:id', photoController.getPhotos)
router.delete('/photos/:id', photoController.deletePhoto)

module.exports = router