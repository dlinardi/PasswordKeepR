/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { database } = require('pg/lib/defaults');
const router  = express.Router();
const dbHelpers = require('../db/index');

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      dbHelpers.getUsers()
        .then(users => {
          res.json({ users });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id", (req, res) => {
      dbHelpers.getUserWithId(req.params.id)
        .then(users => {
          if (!users) {
            res.json({ error: `${req.params.id} is not a valid id.` });
          } else {
            res.json({ users });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  return router;
};
