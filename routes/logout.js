/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = () => {
  router
    .get("/", (req, res) => {
      console.log("get logout")
      req.session = null;
      res.redirect("/login");
    })
    .post('/', (req, res) => {
      console.log("post logout")
      req.session = null;
      res.redirect('/login');
    });

  return router;
};




