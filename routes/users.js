/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

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
        WHERE id = $1;`
      const values = [`${req.params.id}`];

      db.query(queryString, values)
        .then(data => {
          const users = data.rows;
          res.json({ users });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  return router;
};
