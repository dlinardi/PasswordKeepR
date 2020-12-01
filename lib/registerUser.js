const db = require('../db/index');
const bcrypt = require('bcrypt');
const newOrg = require('./newOrg')


// Takes in Object w. email, password,first_name,last_name
const register = (input) => {
  if (input.email === '' || input.password === '') {
    return null;
  }
  input.email = input.email.toLowerCase();
  return db.emailExists(input.email)
    .then((match) => {
      if (match) {
        return null;
      } else {
        //Hash Password for DB storage
        input.password = bcrypt.hashSync(input.password, 12);
        // Add user to DB >
        return db.addUser(input);
      }

    })
    //Create users first Org
    .then((user) => {
      console.log(">>>",user)
      newOrg(user.id, `${user.first_name}'s Site`)
      return user
    })
    .catch((e) => console.log("ERROR!!!", e));
};

module.exports = register;
// const testobj = {
//   email: 'TEST1234@email.ca',
//   password: 'password',
//   first_name: 'Test user 2',
//   last_name: 'LastName 2'
// }
// register(testobj)
