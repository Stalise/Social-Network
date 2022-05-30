const db = require('../utils/db');
const { cloudinary } = require('../utils/cloudinary');

class UserController {

   async createUser(req, res) {
      const { username, name, surname, birth, city, password, img } = req.body

      try {
         const uploadCloudinary = await cloudinary.uploader.upload(img, {
            upload_preset: 'op6ycuoi'
         })

         const newPerson = await db.query(
            `INSERT INTO person (username, name, surname, birth, city, img, password) 
         values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [username, name, surname, birth, city, uploadCloudinary.public_id, password])

         const userInfo = newPerson.rows[0]

         res.json({
            id: userInfo.id,
            surname: userInfo.surname,
            username: userInfo.username,
            name: userInfo.name,
            birth: userInfo.birth,
            city: userInfo.city,
            img: userInfo.img,
         })

      } catch (e) {
         console.log(e)
      }

   }

   async getUser(req, res) {
      try {
         const username = req.params.username;
         const userDb = await db.query(`SELECT * FROM person WHERE username = $1`, [username])
         const userData = userDb.rows[0]

         res.json({
            id: userData.id,
            username: userData.username,
            name: userData.name,
            surname: userData.surname,
            birth: userData.birth,
            city: userData.city,
            img: userData.img,
         })
      } catch (e) {
         console.log(e)
      }
   }

   async updateUser(req, res) {
      const { user_id, name, surname, birth, city, img } = req.body

      try {

         // проверка строковых полей и изменение в бд
         for (let i of Object.keys(req.body)) {
            // проверяем на заполненность полей
            if (i !== 'user_id' && i !== 'img' && req.body[i].length) {
               await db.query(`UPDATE person SET ${i} = $1 WHERE id = $2`, [req.body[i], user_id])
            }
         }

         // логика с заменой картинки
         if (img.length) {
            const currentImg = await db.query('SELECT img FROM person WHERE id = $1', [user_id])

            const deleteImg = await cloudinary.uploader.destroy(currentImg.rows[0].img)

            const uploadImg = await cloudinary.uploader.upload(img, {
               upload_preset: 'op6ycuoi'
            })

            const changeDataBase = await db.query('UPDATE person SET img = $1 WHERE id = $2', [uploadImg.public_id, user_id])
         }

         // отправляем обновленного юзера на клиент
         const userDB = await db.query(`SELECT * FROM person WHERE id = $1`, [user_id])
         const userData = userDB.rows[0]

         res.json({
            surname: userData.surname,
            username: userData.username,
            name: userData.name,
            birth: userData.birth,
            city: userData.city,
            img: userData.img,
         })

      } catch (error) {
         console.log(error)
      }

   }

   async checkUser(req, res) {
      const { username, password } = req.body

      try {

         const sendCheck = await db.query('SELECT username FROM person WHERE username = $1 AND password = $2', [username, password])

         if (sendCheck.rows.length) {
            res.send('true')
         } else { res.send('false') }

      } catch (error) {
         console.log(error)
      }

   }

   async getLikes(req, res) {
      const user_id = req.params.id

      try {
         const getLikes = await db.query('SELECT * FROM likes WHERE user_id = $1', [user_id])

         res.json(getLikes.rows)

      } catch (error) {
         console.log(error)
      }

   }
}

module.exports = new UserController()