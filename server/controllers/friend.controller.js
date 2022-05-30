const db = require('../utils/db');

class FriendController {

   async createFriend(req, res) {
      const { user_id, friend_id } = req.body

      try {

         const checkFriend = await db.query('SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2', [user_id, friend_id])

         // когда отправил заявку в друзья, создаются данные в таблице
         if (checkFriend.rows[0] === undefined) {
            // добавляем друга для юзера в таблице бд
            const forUser = await db.query(
               `INSERT INTO friends (user_id, friend_id, status)
            values ($1, $2, $3) RETURNING *`, [user_id, friend_id, 'sent']
            )

            const forFriend = await db.query(
               `INSERT INTO friends (user_id, friend_id, status)
            values ($1, $2, $3) RETURNING *`, [friend_id, user_id, 'request']
            )

            //статус дружбы отправляется на клиент, для отображения
            res.json(forUser.rows[0].status)
         } else {
            // если юзер уже есть в таблице друзей, но он нажал добавить в друзья до обновления компонента
            const getStatus = await db.query(`SELECT status FROM friends WHERE user_id = $1 AND friend_id = $2`, [user_id, friend_id])

            res.json(getStatus.rows[0].status)
         }

      } catch (error) {
         console.log(error)
      }
   }

   async getFriends(req, res) {
      const user_id = req.params.id

      try {

         const userFriends = await db.query(`SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'friend'`, [user_id])
         const userRequests = await db.query(`SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'request'`, [user_id])

         let friendsList = {
            requests: [],
            friends: []
         }

         // получаем всех друзей юзера со статусом friend и request (ниже)
         for (let i of userFriends.rows) {
            const getFriend = await db.query('SELECT id, name, surname, img, username FROM person WHERE id = $1', [i.friend_id])

            friendsList.friends.push(getFriend.rows[0])
         }

         for (let i of userRequests.rows) {
            const getRequests = await db.query('SELECT id, name, surname, img, username FROM person WHERE id = $1', [i.friend_id])

            friendsList.requests.push(getRequests.rows[0])
         }

         res.json(friendsList)

      } catch (error) {
         console.log(error)
      }

   }

   async deleteFriend(req, res) {
      const { user_id, friend_id } = req.query

      try {

         // удаляем из таблицы друзей, как своей так и друга
         await db.query(`DELETE FROM friends WHERE user_id = $1 AND friend_id = $2`, [user_id, friend_id])
         await db.query(`DELETE FROM friends WHERE user_id = $1 AND friend_id = $2`, [friend_id, user_id])

         // получаем обновленный список друзей по id после удаления
         const userFriends = await db.query(`SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'friend'`, [user_id])

         let friendsList = {
            friends: []
         }

         // заполняем массив друзей для отправки на клиент
         for (let i of userFriends.rows) {
            const getFriend = await db.query('SELECT id, name, surname, img FROM person WHERE id = $1', [i.friend_id])

            friendsList.friends.push(getFriend.rows[0])
         }

         res.json(friendsList)

      } catch (error) {
         console.log(error)
      }

   }

   async rejectFriend(req, res) {
      const { user_id, friend_id } = req.query

      try {

         // удаляем из таблицы друзей, когда получаем статус 'отклонено' с сервера
         await db.query(`DELETE FROM friends WHERE user_id = $1 AND friend_id = $2`, [user_id, friend_id])
         await db.query(`DELETE FROM friends WHERE user_id = $1 AND friend_id = $2`, [friend_id, user_id])

         // получаем обновленный список запросов в друзья  по id после удаления
         const userRequests = await db.query(`SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'request'`, [user_id])

         let friendsList = {
            requests: []
         }

         for (let i of userRequests.rows) {
            const getRequest = await db.query('SELECT id, name, surname, img FROM person WHERE id = $1', [i.friend_id])

            friendsList.requests.push(getRequest.rows[0])
         }

         res.json(friendsList)

      } catch (error) {
         console.log(error)
      }

   }

   async acceptFriend(req, res) {
      const { user_id, friend_id, status } = req.body

      try {

         // обновляем статус для юзера и его друга в бд
         await db.query(`UPDATE friends SET status = $1 WHERE user_id = $2 AND friend_id = $3`, [status, user_id, friend_id])
         await db.query(`UPDATE friends SET status = $1 WHERE user_id = $3 AND friend_id = $2`, [status, user_id, friend_id])

         //получаем списки друзей и запросов в друзья
         const userFriends = await db.query(`SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'friend'`, [user_id])
         const userRequests = await db.query(`SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'request'`, [user_id])

         let friendsList = {
            requests: [],
            friends: []
         }

         for (let i of userFriends.rows) {
            const getFriend = await db.query('SELECT id, name, surname, img FROM person WHERE id = $1', [i.friend_id])

            friendsList.friends.push(getFriend.rows[0])
         }

         for (let i of userRequests.rows) {
            const getRequests = await db.query('SELECT id, name, surname, img FROM person WHERE id = $1', [i.friend_id])

            friendsList.requests.push(getRequests.rows[0])
         }

         res.json(friendsList)

      } catch (error) {
         console.log(error)
      }

   }

   async getStatus(req, res) {
      const { user_id, friend_id } = req.query

      try {

         const getStatus = await db.query(`SELECT status FROM friends WHERE user_id = $1 AND friend_id = $2`, [user_id, friend_id])

         res.json(getStatus?.rows[0]?.status || '')

      } catch (error) {
         console.log(error)
      }
   }

   async changeStatus(req, res) {
      const { user_id, friend_id, status } = req.body

      try {

         const forUser = await db.query(
            `UPDATE friends SET status = $1 WHERE user_id = $2 AND friend_id = $3`, [status, user_id, friend_id]
         )

         const forFriend = await db.query(
            `UPDATE friends SET status = $1 WHERE user_id = $3 AND friend_id = $2 RETURNING *`, [status, user_id, friend_id]
         )
         res.json(forFriend.rows[0].status)

      } catch (error) {
         console.log(error)
      }

   }
}

module.exports = new FriendController()