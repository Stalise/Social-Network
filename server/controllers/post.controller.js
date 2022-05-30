const db = require('../utils/db');
const { cloudinary } = require('../utils/cloudinary');


class PostController {

   async createPost(req, res) {
      const { name, surname, text, date, user_id, img } = req.body
      let uploadCloudinary = ''

      try {
         // если есть картинка с постом, то отправляем её с облачное хранилище
         if (img.length > 0) {
            uploadCloudinary = await cloudinary.uploader.upload(img, {
               upload_preset: 'op6ycuoi'
            })
         }

         // добавляем в response фото создателя поста, чтобы потом отображать в news
         const img_user = await db.query('SELECT img FROM person WHERE id = $1', [user_id])

         const newPost = await db.query(
            `INSERT INTO post (name, surname, img_user, text, date, img_post, user_id) 
            values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, surname, img_user.rows[0].img, text, date,
               uploadCloudinary.public_id ? uploadCloudinary.public_id : ''
               , user_id])

         const allUserPost = await db.query('SELECT * FROM post WHERE user_id = $1 ORDER BY id DESC', [user_id])

         res.json(allUserPost.rows)
      } catch (error) {
         console.log(error)
      }
   }

   async getPosts(req, res) {
      const id = req.params.id

      try {

         const getPosts = await db.query(`SELECT * FROM post WHERE user_id = $1 ORDER BY id DESC`, [id])
         const posts = getPosts.rows

         res.json(posts)

      } catch (error) {
         console.log(error)
      }

   }

   async deletePost(req, res) {
      const idPost = req.params.id

      try {
         const postDB = await db.query(`SELECT * FROM post WHERE id = $1`, [idPost])
         const user_id = postDB.rows[0].user_id
         const img = postDB.rows[0].img_post

         if (img.length > 0) {
            //если есть еще и картинка в посту, то сначала удаляем ее из облака
            const deleteImg = await cloudinary.uploader.destroy(img)
         }

         // удаляем пост из таблицы
         await db.query(`DELETE FROM post WHERE id = $1`, [idPost])
         // получаем обновленный список постов из дб
         const getPosts = await db.query(`SELECT * FROM post WHERE user_id = $1 ORDER BY id DESC`, [user_id])
         const posts = getPosts.rows

         res.json(posts)

      } catch (error) {
         console.log(error)
      }
   }

   async createLike(req, res) {
      const { user_id, post_id } = req.body

      try {

         const newLike = await db.query(
            `INSERT INTO likes (user_id, post_id) 
            values ($1, $2) RETURNING *`,
            [user_id, post_id])

         const allPostLikes = await db.query('SELECT * FROM likes WHERE post_id = $1', [post_id])
         res.json(allPostLikes.rows)

      } catch (error) {
         console.log(error)
      }

   }

   async getLikes(req, res) {
      const PostId = req.params.id

      try {

         const getLikes = await db.query(`SELECT * FROM likes WHERE post_id = $1`, [PostId])
         const likes = getLikes.rows

         res.json(likes)

      } catch (error) {
         console.log(error)
      }

   }

}

module.exports = new PostController()