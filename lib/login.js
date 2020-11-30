const db = require('../db/index')
const bcrypt = require('bcrypt');

/*
 id |    name    |   email    |                           password
----+------------+------------+--------------------------------------------------------------
  1 | John Smith | j@smith.ca | $2b$12$hbTktSrEBEDP/Vojh0F5RuFFJOXG1TCRSep4BoZ3PLzNJszFS0Mz6

 */
// pass = bcrypt.hashSync('password', 12);
const login = function (email, inputPassword) {
  return db.getUserWithEmail(email)
    .then(user => {
      console.log(">>>>", inputPassword,user.password)
      // if (inputPassword === user.password){
      //     console.log("pass")
      // }
      if (bcrypt.compareSync(inputPassword, user.password)) {
        console.log("Login Passed")
        return user;
      }
      return null;
    });
}

login('test1@test.ca', 'password')

//Place Holder - Modeled from LightBNB
/*
router.post('/login', (req, res) => {
  const {email, password} = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send('No User (!User)');
        return;
      }
      req.session.userId = user.id;
      res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));
});


router.post('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/');
});
 */
