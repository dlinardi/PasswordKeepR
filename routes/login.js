/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { database } = require('pg/lib/defaults');
const router = express.Router();
// const { getUserWithId } = require('../db/index');
const userLogin = require('../lib/login.js')

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      res.render("login");
    })
    .post("/", (req, res) => {
      console.log(req.body.email)
      console.log("USER:",userLogin)
      res.redirect('/')
    })
  return router;
};
