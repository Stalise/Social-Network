const jwt = require('jsonwebtoken')
const db = require('../utils/db');
const { cloudinary } = require('../utils/cloudinary');

const responseMessages = require('../constants/responseMessages');
const TokensHandler = require('../utils/tokensHandler')

class UserController {

   async checkAuthUser(req, res) {
      try {
         const decoded = jwt.decode(req.cookies.token)
         const username = decoded.username

         res.status(200).json({ message: responseMessages.success, username })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async authUser(req, res) {
      const { username, password } = req.body

      try {
         // проверяем username в базе данных
         const checkUsername = await db.query(
            `SELECT username FROM persons WHERE username = $1`,
            [username]
         )

         if (!checkUsername.rows.length) {
            return res.status(401).json({ message: responseMessages.missingUsername });
         }

         // если username выше есть, то проверяем в базе пароль
         const checkPassword = await db.query(
            `SELECT * FROM persons WHERE username = $1 AND password = $2`,
            [username, password]
         )

         if (!checkPassword.rows.length) {
            return res.status(401).json({ message: responseMessages.invalidPassword });
         }

         const jwtAccess = TokensHandler.generateAccessToken({ username })
         const jwtRefresh = TokensHandler.generateRefreshToken({ username })

         await db.query(`UPDATE persons SET token = $1 WHERE username = $2`, [jwtRefresh, username])

         res.cookie('token', jwtAccess, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
         res.status(200).json({ message: responseMessages.successAuth })

      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async regUser(req, res) {
      const { username, name, surname, birth, city, file, password } = req.body;

      try {
         const checkUsername = await db.query(`SELECT username FROM persons WHERE username = $1`, [username])

         if (checkUsername.rows.length) {
            return res.status(401).json({ message: responseMessages.existUsername });
         }

         const uploadCloudinary = await cloudinary.uploader.upload(file, {
            upload_preset: 'op6ycuoi'
         })

         const jwtAccess = TokensHandler.generateAccessToken({ username })
         const jwtRefresh = TokensHandler.generateRefreshToken({ username })

         await db.query(
            "INSERT INTO persons (username, name, surname, birth, city, avatar, password, token) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [username, name, surname, birth, city, uploadCloudinary.public_id, password, jwtRefresh]
         )

         res.cookie("token", jwtAccess, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
         res.status(200).json({ message: responseMessages.successReg })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async logoutUser(req, res) {
      try {
         const decoded = jwt.decode(req.cookies.token)
         const username = decoded.username

         res.clearCookie("token");
         await db.query(`UPDATE persons SET token = '' WHERE username = $1`, [username])

         res.status(200).json({ message: responseMessages.success })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async getUser(req, res) {
      const username = req.params.username

      try {
         const response = await db.query(`SELECT * FROM persons WHERE username = $1`, [username])
         let userData = response.rows[0]

         userData = {
            username: userData.username,
            name: userData.name,
            surname: userData.surname,
            birth: userData.birth,
            city: userData.city,
            avatar: userData.avatar,
         }

         res.status(200).json({ message: responseMessages.success, userData })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
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
}

module.exports = new UserController()