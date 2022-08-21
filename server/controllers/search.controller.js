const db = require('../utils/db');

const responseMessages = require('../constants/responseMessages');
const getUsername = require('../utils/helpers');
const TokensHandler = require('../utils/tokensHandler');

class FriendController {

   // TODO: продумать логику получения пользователей
   async allUsers(req, res) {
      const username = req.params.username;

      try {
         const findUsers = await db.query(`
            SELECT id, name, surname, img, username
            FROM person
            WHERE id != $1`,
         [username]);

         res.json(findUsers.rows);

      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async oneUser(req, res) {
      const person_username = req.params.username;

      const user_username = getUsername(req.cookies.token);

      try {
         const response = await db.query(`
            SELECT username, name, surname, avatar
            FROM persons
            WHERE username = $1`,
         [person_username]);

         if (!response.rows.length) {
            return res.status(412).json({ message: responseMessages.userNotFound });
         }

         res.status(200).json({ message: responseMessages.success, data: response.rows[0] });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }
}

module.exports = new FriendController();
