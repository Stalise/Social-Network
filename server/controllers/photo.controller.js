const db = require('../utils/db');
const { cloudinary } = require('../utils/cloudinary');
const getUsername = require('../utils/helpers');
const responseMessages = require('../constants/responseMessages');

class PhotoController {

   async getPhotos(req, res) {
      const user_username = getUsername(req.cookies.token);

      try {
         let response = await db.query(`
            SELECT *
            FROM photos
            WHERE user_username = $1
            ORDER BY id DESC`,
         [user_username]);

         response = response.rows;

         res.status(200).json({ message: responseMessages.success, data: response });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async addPhoto(req, res) {
      const { data } = req.body;

      const user_username = getUsername(req.cookies.token);

      try {
         const uploadCloudinary = await cloudinary.uploader.upload(data, {
            upload_preset: 'op6ycuoi',
         });

         let response = await db.query(`
            INSERT INTO photos (img, user_username)
            values ($1, $2) RETURNING *`,
         [uploadCloudinary.public_id, user_username]);

         response = response.rows[0];

         res.status(200).json({ message: responseMessages.successAddPhoto, data: response });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async deletePhoto(req, res) {
      const idPhoto = req.params.id;

      try {
         // получаем данные фото из таблицы в бд
         let response = await db.query(`
            SELECT img
            FROM photos
            WHERE id = $1`,
         [idPhoto]);

         response = response.rows[0].img;

         // удаляем фото из облака
         await cloudinary.uploader.destroy(response);

         await db.query(`
            DELETE FROM photos
            WHERE id = $1`,
         [idPhoto]);

         res.status(200).json({ message: responseMessages.success });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

}

module.exports = new PhotoController();
