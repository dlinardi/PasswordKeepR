const express = require('express');
const { database } = require('pg/lib/defaults');
const router = express.Router();
const registerUser = require('../lib/registerUser');
const reqAndCheckCookie = require('../lib/helper')

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      if (reqAndCheckCookie) {
        res.redirect("/");
      } else {
        res.render('register');
      }
    })
    .post("/", (req, res) => {
      // console.log("req",req.body)
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
