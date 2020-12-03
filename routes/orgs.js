/*
 * All routes for Organizations are defined here
 * Since this file is loaded in server.js into api/orgs,
 *   these routes are mounted onto /orgs
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbHelpers = require('../db/index');

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      dbHelpers.getOrgs()
        .then(orgs => {
          res.json(orgs);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id", (req, res) => {

      dbHelpers.getOrgWithId(req.params.id)
        .then(orgs => {
          if (!orgs) {
            res.json({ error: `${req.params.id} is not a valid id.` });
          } else {
            res.json(orgs);
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/users", (req, res) => {
      dbHelpers.getOrgUsers(req.params.id)
        .then(orgs => {
          if (!orgs) {
            res.json({ error: `${req.params.id} is not a valid id.` });
          } else {
            res.json(orgs);
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/users/:user_id", (req, res) => {
      dbHelpers.getOrgUsersWithId(req.params.id, req.params.user_id)
        .then(orgs => {
          if (!orgs) {
            res.json({ error: `${req.params.id} or ${req.params.user_id} is not a valid id.` });
          } else {
            res.json(orgs);
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/sites", (req, res) => {
      dbHelpers.getOrgUrls(req.params.id)
        .then(orgs => {
          if (!orgs) {
            res.json({ error: `${req.params.id} is not a valid id.` });
          } else {
            res.json(orgs);
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:id/sites/:sites_id", (req, res) => {
      dbHelpers.getOrgUrlsWithSiteId(req.params.id, req.params.sites_id)
        .then(orgs => {
          if (!orgs) {
            res.json({ error: `${req.params.id} or ${req.params.sites_id} is not a valid id.` });
          } else {
            res.json(orgs);
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .post("/new", (req, res) => {
      dbHelpers.addOrg(req.body.orgName)
        .then(org => {
          console.log(org);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .post("/:id/addUser", (req, res) => {
      const { userId, canWrite } = req.body;
      dbHelpers.addUserToOrg(userId, req.params.id, canWrite)
        .then(user => {
          console.log(user);
        })
        .catch(err => { console.log(err)});
    })
    .post("/:id/addSite", (req, res) => {
      req.body.org_id = req.params.id;
      const site = req.body;
      console.log("ROUTE>>",site)
      dbHelpers.addSite(site)
        .then(site => {
          console.log(site);
        })
        .catch(err => { console.log(err)});
    });
  return router;
};
