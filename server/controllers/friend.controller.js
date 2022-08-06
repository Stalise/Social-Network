const db = require('../utils/db');
const getUsername = require('../utils/helpers');
const responseMessages = require('../constants/responseMessages');

class FriendController {

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

   async createFriend(req, res) {
      const { person_username } = req.body;

      const user_username = getUsername(req.cookies.token);

      try {
         const checkAvailable = await db.query(`
         SELECT *
         FROM friends
         WHERE (user_first = $1
         AND user_second = $2)
         OR (user_first = $2
         AND user_second = $1)`,
         [user_username, person_username],
         );

         // если друга не найдено в бд, то создаем сущность
         if (!checkAvailable.rows.length) {
            await db.query(
               "INSERT INTO friends (user_first, user_second, status) values ($1, $2, $3) RETURNING *",
               [user_username, person_username, "sent"],
            );

            const response = await db.query(`SELECT * FROM persons WHERE username = $1`, [person_username]);
            let friendData = response.rows[0];

            friendData = {
               username: friendData.username,
               name: friendData.name,
               surname: friendData.surname,
               img: friendData.avatar,
               status: "sent",
            };

            res.status(200).json({ message: responseMessages.success, friendData });
         } else {
            // если друг уже есть в бд, то смотрим на статус, и в зависимости от него отправляет ответ c новым статусом
            const friendData = checkAvailable.rows[0];

            if (friendData.status === "friend") {
               res.status(409).json({ message: responseMessages.entityExist, status: friendData.status });
            } else if (friendData.status === "sent" && friendData.user_first === user_username) {
               res.status(409).json({ message: responseMessages.entityExist, status: friendData.status });
            } else if (friendData.status === "request" && friendData.user_first === user_username) {
               res.status(409).json({ message: responseMessages.entityExist, status: friendData.status });
            } else if (friendData.status === "sent" && friendData.user_second === user_username) {
               res.status(409).json({ message: responseMessages.entityExist, status: "request" });
            } else if (friendData.status === "request" && friendData.user_second === user_username) {
               res.status(409).json({ message: responseMessages.entityExist, status: "sent" });
            }
         }
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async acceptFriend(req, res) {
      const { person_username } = req.body;

      const user_username = getUsername(req.cookies.token);

      try {
         await db.query(`UPDATE friends SET status = 'friend' WHERE user_first = $1 AND user_second = $2`, [person_username, user_username]);

         res.status(200).json({ message: responseMessages.success });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async deleteFriend(req, res) {
      const { person_username } = req.body;

      const user_username = getUsername(req.cookies.token);

      try {

         const response = await db.query(`
         SELECT *
         FROM friends
         WHERE (user_first = $1
         AND user_second = $2)
         OR (user_first = $2
         AND user_second = $1)`,
         [user_username, person_username],
         );

         await db.query(`DELETE FROM friends WHERE id = $1`, [response.rows[0].id]);

         res.status(200).json({ message: responseMessages.success });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }
}

module.exports = new FriendController();
