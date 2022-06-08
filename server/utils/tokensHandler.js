const db = require('../utils/db');
const jwt = require('jsonwebtoken');

const jwtMessages = require('../constants/jwt');
const responseMessages = require('../constants/responseMessages');

const TokensHandler = {

   generateAccessToken: (payload) => {
      const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_JWT, { expiresIn: "10m" })
      return accessToken
   },

   generateRefreshToken: (payload) => {
      const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_JWT, { expiresIn: "30d" })
      return refreshToken
   },

   validateAccessToken: (token) => {
      try {
         jwt.verify(token, process.env.SECRET_ACCESS_JWT);

         return responseMessages.success
      } catch (error) {
         // если токен валиден, но истекло время
         if (error.expiredAt) {
            return jwtMessages.timeExpired
         }

         return jwtMessages.needAuth
      }
   },

   validateRefreshToken: async (token) => {
      try {
         const decodedAccess = jwt.decode(token);
         const usernameAccess = decodedAccess.username;

         const getRefresh = await db.query(`SELECT token FROM persons WHERE username = $1`, [usernameAccess])

         if (!getRefresh.rows.length) return jwtMessages.needAuth;

         const refreshToken = getRefresh.rows[0].token;
         const decodedRefresh = jwt.decode(refreshToken);
         const usernameRefresh = decodedRefresh.username;

         // если username аксес и рефреш токенов не равны, значит юзер пытается использовать аксесс токен
         // чтобы получить данные другого юзера
         if (usernameAccess !== usernameRefresh) return jwtMessages.needAuth;

         jwt.verify(refreshToken, process.env.SECRET_REFRESH_JWT);

         return responseMessages.success;
      } catch (error) {
         return jwtMessages.needAuth;
      }
   }
}

module.exports = TokensHandler;