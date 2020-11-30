/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { database } = require('pg/lib/defaults');
const router  = express.Router();

// const { getUserWithId } = require('../db/index');

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      db.query(`SELECT id, first_name, last_name, email FROM users;`)
        .then(data => {
          const users = data.rows;
          res.json({ users });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id", (req, res) => {
      const queryString = `
        SELECT id, first_name, last_name, email
        FROM users
        WHERE id = $1;
        `;

      const values = [`${req.params.id}`];

      db.query(queryString, values)
        .then(data => {
          const users = data.rows;
          if (data.rows.length === 0) {
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
