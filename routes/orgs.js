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
      console.log("ROOT HIT")
      db.query(`SELECT * FROM organizations;`)
        .then(data => {
          const orgs = data.rows;
          res.send('hi cowboy')
          // res.json({ orgs });
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
          if (data.rows.length === 0) {
            res.json({ error: `${req.params.id} is not a valid id.` });
          } else {
            res.json({ orgs });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/users", (req, res) => {

      const queryString = `
        SELECT users.id as user_id, first_name, last_name, email, users.display_picture as image
        FROM org_users
        JOIN users ON users.id = user_id
        JOIN organizations ON organizations.id = org_id
        WHERE organizations.id = $1
        GROUP BY users.id, organizations.id, org_users.can_write
        ORDER BY can_write;
        `;

      const values = [`${req.params.id}`];

      db.query(queryString, values)
        .then(data => {
          const orgs = data.rows;
          if (data.rows.length === 0) {
            res.json({ error: `${req.params.id} is not a valid id.` });
          } else {
            res.json({ orgs });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/users/:user_id", (req, res) => {

      const queryString = `
        SELECT users.id as user_id, first_name, last_name, email, users.display_picture as image
        FROM org_users
        JOIN users ON users.id = user_id
        JOIN organizations ON organizations.id = org_id
        WHERE organizations.id = $1 AND users.id = $2
        GROUP BY users.id, organizations.id, org_users.can_write
        ORDER BY can_write;
        `;

      const values = [`${req.params.id}`, `${req.params.user_id}`];

      db.query(queryString, values)
        .then(data => {
          const orgs = data.rows;
          if (data.rows.length === 0) {
            res.json({ error: `${req.params.id} or ${req.params.user_id} is not a valid id.` });
          } else {
            res.json({ orgs });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/sites", (req, res) => {

      const queryString = `
        SELECT organizations.id as org_id, sites.id as site_id, url, login_name, account_email, tags, created_date, deleted_date, is_active
        FROM sites
        JOIN organizations ON organizations.id = org_id
        WHERE organizations.id = $1
        GROUP BY sites.id, organizations.id;
        `;

      const values = [`${req.params.id}`];

      db.query(queryString, values)
        .then(data => {
          const orgs = data.rows;
          if (data.rows.length === 0) {
            res.json({ error: `${req.params.id} is not a valid id.` });
          } else {
            res.json({ orgs });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/sites/:sites_id", (req, res) => {

      const queryString = `
        SELECT organizations.id as org_id, sites.id as site_id, url, login_name, account_email, tags, created_date, deleted_date, is_active
        FROM sites
        JOIN organizations ON organizations.id = org_id
        WHERE organizations.id = $1 AND sites.id = $2
        GROUP BY sites.id, organizations.id;
        `

      const values = [`${req.params.id}`, `${req.params.sites_id}`];

      db.query(queryString, values)
        .then(data => {
          const orgs = data.rows;
          if (data.rows.length === 0) {
            res.json({ error: `${req.params.id} or ${req.params.sites_id} is not a valid id.` });
          } else {
            res.json({ orgs });
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
