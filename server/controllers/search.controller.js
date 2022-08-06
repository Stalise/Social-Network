const db = require('../utils/db');

class FriendController {

   async allUsers(req, res) {
      const user_id = req.params.id;

      try {
         const findUsers = await db.query('SELECT id,name,surname,img,username FROM person WHERE id != $1', [user_id]);

         res.json(findUsers.rows);

      } catch (error) {
      }

   }

   async oneUser(req, res) {
      const username = req.params.username;

      try {

         const findUser = await db.query('SELECT id,name,surname,img,username FROM person WHERE username = $1', [username]);

         res.json(findUser.rows);

      } catch (error) {
      }
   }
}

module.exports = new FriendController();
