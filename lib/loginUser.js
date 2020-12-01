const db = require('../db/index');
const bcrypt = require('bcrypt');


const login = function(email, inputPassword) {
  return db.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(inputPassword, user.password)) {
        console.log("Login Passed");
        return user;
      }
      return null;
    });
};

module.exports = login;
