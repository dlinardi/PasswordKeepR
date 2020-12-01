const db = require('../db/index');
const bcrypt = require('bcrypt');


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
