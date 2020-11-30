// pass = bcrypt.hashSync('password', 12);
const db = require('../db/index')
const bcrypt = require('bcrypt');

const check = function (inputEmail) {
  return db.emailExists(inputEmail)
    .then(match => {
      console.log(">>>>", match, inputEmail)
      if (match) {
        return true;
      } else {
        return false;
      }
    });
}

// Takes in Object w. email, password,first_name,last_name
const register = (input) => {
  if (input.email === '' || input.password === '') {
    res.status(400);
    res.send("Email and/or password cannot be blank");
    //Check is email exists in DB
  } /* else if (db.emailExists(userEmail) === true) {
    console.log("ALREADY EXISTS")
    res.status(400);
    res.send("Email already exists");
  } */ else {
    input.password = bcrypt.hashSync(input.password, 12);
    input.email = input.email.toLowerCase();
    console.log("Add SUer to DB OBJ>>", input)

    // Add user to DB >
    db.addUser(input)

    // Set Cookie
    //Get ID by email assign to cookeie
    // req.session['user_id'] = db.getUserWithEmail(input.email);
  }
}
// const testobj = {
//   email: 'TEST321@email.ca',
//   password: 'password',
//   first_name: 'Test user',
//   last_name: 'LastName'
// }
// register(testobj)


/*
router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });
*/
