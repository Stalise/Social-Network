const db = require('../utils/db');

const { cloudinary } = require('../utils/cloudinary');


class PhotoController {

   async createPhoto(req, res) {
      const { user_id, img } = req.body

      try {
         const uploadCloudinary = await cloudinary.uploader.upload(img, {
            upload_preset: 'op6ycuoi'
         })

         const newPhoto = await db.query(
            `INSERT INTO person_photos (img, user_id) 
            values ($1, $2) RETURNING *`,
            [uploadCloudinary.public_id, user_id]);

         const allUserPhotos = await db.query('SELECT * FROM person_photos WHERE user_id = $1 ORDER BY id DESC', [user_id])

         res.json(allUserPhotos.rows)
      } catch (e) {
         console.log(e)
      }
   }

   async getPhotos(req, res) {
      const userId = req.params.id

      try {

         const getPosts = await db.query(`SELECT * FROM person_photos WHERE user_id = $1 ORDER BY id DESC`, [userId])
         const photos = getPosts.rows

         res.json(photos)

      } catch (error) {
         console.log(error)
      }

   }

   async deletePhoto(req, res) {
      const idPhoto = req.params.id

      try {
         // получаем данные фото из таблицы в бд
         const photoDB = await db.query(`SELECT * FROM person_photos WHERE id = $1`, [idPhoto])
         const user_id = photoDB.rows[0].user_id
         const imgName = photoDB.rows[0].img

         const deleteImg = await cloudinary.uploader.destroy(imgName)

         // удаляем фото из таблицы в бд
         await db.query(`DELETE FROM person_photos WHERE id = $1`, [idPhoto])
         // получаем обновленный список фото из дб
         const getPhotos = await db.query(`SELECT * FROM person_photos WHERE user_id = $1 ORDER BY id DESC`, [user_id])
         const photos = getPhotos.rows

         res.json(photos)

      } catch (error) {
         console.log(error)
      }
   }

}

module.exports = new PhotoController()