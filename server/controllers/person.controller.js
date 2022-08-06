const db = require('../utils/db');

const responseMessages = require('../constants/responseMessages');
const getUsername = require('../utils/helpers');

class PersonController {

   async getPerson(req, res) {
      const { username } = req.params;

      try {
         const response = await db.query(`SELECT * FROM persons WHERE username = $1`, [username]);
         let userData = response.rows[0];

         userData = {
            username: userData.username,
            name: userData.name,
            surname: userData.surname,
            birth: userData.birth,
            city: userData.city,
            avatar: userData.avatar,
         };

         res.status(200).json({ message: responseMessages.success, userData });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async getPosts(req, res) {
      const { person } = req.params;

      const username = getUsername(req.cookies.token);

      try {
         const response = await db.query("SELECT * FROM posts WHERE user_username = $1 ORDER BY id DESC", [person]);
         const posts = response.rows;

         // проверяем на наличие лайков пользователя под постом
         if (posts.length) {
            for (let i = 0; i < posts.length; i++) {
               const response = await db.query(`
               SELECT * FROM likes WHERE user_username = $1 AND post_id = $2`,
               [username, posts[i].id]);

               if (response.rows.length) {
                  posts[i].isLike = true;
               } else {
                  posts[i].isLike = false;
               }
            }
         }

         res.status(200).json({ message: responseMessages.success, posts });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async getFriends(req, res) {
      const { username } = req.params;

      try {
         const response = await db.query(`SELECT * FROM friends WHERE user_first = $1 OR user_second = $1`, [username]);

         const friends = [];

         // получаем всех друзей юзера с пришедших username, и устанавливаем статус дружбы для каждого
         for (const item of response.rows) {
            if (item.user_first === username) {
               const response = await db.query('SELECT username, name, surname, avatar FROM persons WHERE username = $1', [item.user_second]);
               response.rows[0].status = item.status;
               friends.push(response.rows[0]);
            } else {
               const response = await db.query('SELECT username, name, surname, avatar FROM persons WHERE username = $1', [item.user_first]);
               let trueStatus;

               if (item.status === "friend") trueStatus = "friend";
               else if (item.status === "request") trueStatus = "sent";
               else if (item.status === "sent") trueStatus = "request";

               response.rows[0].status = trueStatus;
               friends.push(response.rows[0]);
            }
         }

         res.status(200).json({ message: responseMessages.success, friends });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }

   }

   async getPhotos(req, res) {
      const { username } = req.params;

      try {
         let response = await db.query(
            `SELECT * FROM photos WHERE user_username = $1 ORDER BY id DESC`,
            [username],
         );
         response = response.rows;

         res.status(200).json({ message: responseMessages.success, data: response });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }
}

module.exports = new PersonController();
