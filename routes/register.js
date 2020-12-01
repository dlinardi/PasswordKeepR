const express = require('express');
const { database } = require('pg/lib/defaults');
const router = express.Router();
const registerUser = require('../lib/registerUser');

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      if (!req.session.userId) {
        res.render('register');
      }
      res.redirect("/");
    })
    .post("/", (req, res) => {
      registerUser(req.body)
        .then(user => {
          if (!user) {
            res.send('Registration Failed');
            return;
          }
          //Set cookie
          req.session.userId = user.id;
          res.redirect(`/`);
        })
        .catch(e => res.send(e));

    });
  return router;
};
