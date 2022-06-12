const jwt = require('jsonwebtoken')
const db = require('../utils/db');
const { cloudinary } = require('../utils/cloudinary');

const responseMessages = require('../constants/responseMessages');


class PostController {

   async createPost(req, res) {
      const { text, img, date } = req.body
      let uploadCloudinary = ""

      const decoded = jwt.decode(req.cookies.token)
      const username = decoded.username

      try {
         // если есть картинка с постом, то отправляем её в облачное хранилище
         if (img.length) {
            uploadCloudinary = await cloudinary.uploader.upload(img, {
               upload_preset: 'op6ycuoi'
            })
         }

         const response = await db.query(`
            INSERT INTO posts (text, img, date, user_username) 
            values ($1, $2, $3, $4) RETURNING *
         `, [text, uploadCloudinary.public_id ? uploadCloudinary.public_id : "", date, username])

         const post = response.rows[0]

         res.status(200).json({ message: responseMessages.success, post })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async getPosts(req, res) {
      const { user, person } = req.query
      console.log(user, person)

      try {
         const response = await db.query("SELECT * FROM posts WHERE user_username = $1 ORDER BY id DESC", [person ? person : user])
         const posts = response.rows

         // проверяем на наличие лайков пользователя под постом
         if (posts.length) {
            for (let i = 0; i < posts.length; i++) {
               const response = await db.query(`
               SELECT * FROM likes WHERE user_username = $1 AND post_id = $2`,
                  [user, posts[i].id])

               if (response.rows.length) {
                  posts[i].isLike = true
               } else {
                  posts[i].isLike = false
               }
            }
         }

         res.status(200).json({ message: responseMessages.success, posts })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async deletePost(req, res) {
      const idPost = req.params.id

      try {
         const response = await db.query(`SELECT * FROM posts WHERE id = $1`, [idPost])
         const post = response.rows[0]

         if (post.img.length) {
            //если есть еще и картинка в посту, то сначала удаляем ее из облака
            await cloudinary.uploader.destroy(post.img)
         }

         // удаляем пост из таблицы
         await db.query(`DELETE FROM posts WHERE id = $1`, [idPost])

         res.status(200).json({ message: responseMessages.success })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async createLike(req, res) {
      const { username, postId } = req.body

      try {
         const response = await db.query(`
         SELECT * FROM likes WHERE user_username = $1 AND post_id = $2`,
            [username, postId])

         if (response.rows.length) {
            return res.status(409).json({ message: responseMessages.entityExist })
         }

         await db.query(
            `INSERT INTO likes (user_username, post_id) 
            values ($1, $2) RETURNING *`,
            [username, postId])

         await db.query(`UPDATE posts SET likes = likes + 1 WHERE id = $1`, [postId])

         res.status(200).json({ message: responseMessages.success })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }

   }

   async deleteLike(req, res) {
      const { username, postId } = req.body;

      try {
         // удаляем лайк из таблицы
         await db.query(`DELETE FROM likes WHERE user_username = $1 AND post_id = $2`, [username, postId])

         await db.query(`UPDATE posts SET likes = likes - 1 WHERE id = $1`, [postId])

         res.status(200).json({ message: responseMessages.success })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

}

module.exports = new PostController()