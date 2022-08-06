const jwt = require('jsonwebtoken');

const getUsername = token => {
   const decoded = jwt.decode(token);

   return decoded.username;
};

module.exports = getUsername;
