/*
 * All routes for Organizations are defined here
 * Since this file is loaded in server.js into api/orgs,
 *   these routes are mounted onto /orgs
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      db.query(`SELECT * FROM organizations;`)
        .then(data => {
          const orgs = data.rows;
          res.json({ orgs });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id", (req, res) => {

      const queryString = `
        SELECT id, name, display_picture as image
        FROM organizations
        WHERE id = $1;`

      const values = [`${req.params.id}`];

      db.query(queryString, values)
        .then(data => {
          const orgs = data.rows;
          res.json({ orgs });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  return router;
};
