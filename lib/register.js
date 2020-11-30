const db = require('../db/index')
const bcrypt = require('bcrypt');


// Takes in Object w. email, password,first_name,last_name
const register = (input) => {
  if (input.email === '' || input.password === '') {
    return null;
  }
  input.email = input.email.toLowerCase();
  return db.emailExists(input.email)
    .then((match) => {
      if (!match) {
        //Hash Password for DB storage
        input.password = bcrypt.hashSync(input.password, 12);
        // Add user to DB >
        db.addUser(input)

      } else {
        console.log("Email Already exists")
      }
    })
    .catch((e) => console.log("ERROR!!!", e))
}


// const testobj = {
//   email: 'TEST1234@email.ca',
//   password: 'password',
//   first_name: 'Test user 2',
//   last_name: 'LastName 2'
// }
// register(testobj)
