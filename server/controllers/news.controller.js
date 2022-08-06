const db = require('../utils/db');

class NewsController {

   async getNews(req, res) {
      const user_id = req.params.id;

      try {

         const userFriends = await db.query(`SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'friend'`, [user_id]);
         const allNews = [];

         for (const i of userFriends.rows) {
            const getPosts = await db.query('SELECT * FROM post WHERE user_id = $1', [i.friend_id]);

            // проверка на количество полученных постов для пользователя и добавление к ним username из бд
            if (getPosts.rows.length != 0) {
               if (getPosts.rows.length > 1) {
                  for (const i of getPosts.rows) {
                     const getUsername = await db.query('SELECT username FROM person WHERE id = $1', [i.user_id]);
                     i.username = getUsername.rows[0].username;
                     allNews.push(i);
                  }
               } else if (getPosts.rows.length === 1) {
                  const getUsername = await db.query('SELECT username FROM person WHERE id = $1', [getPosts.rows[0].user_id]);
                  getPosts.rows[0].username = getUsername.rows[0].username;
                  allNews.push(getPosts.rows[0]);
               }
            }
         }

         res.json(allNews);

      } catch (error) {
      }

   }

}

module.exports = new NewsController();
