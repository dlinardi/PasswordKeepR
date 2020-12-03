/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbHelpers = require('../db/index');

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      const { userId } = req.session;
      const templateVars = { userId };

      console.log(userId);

      if (userId) {
        res.render("index", templateVars);
      }

      res.redirect("/login");

    })
    .post("/new", (req, res) => {
      const site = req.body;
      dbHelpers.addSite(site)
        .then(site => {
          console.log(site);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .get("/search/:query", (req, res) => {
      const { userId } = req.session;
      const { query } = req.params;
      dbHelpers.getAllUserSitesBySearch(userId, query)
        .then(result => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .post("/search", (req, res) => {
      const searchString = req.body;
      res.redirect(`/search/${searchString}`);
    })
    .put("/edit", (req, res) => {
      const { siteProperty, newValue, siteId } = req.body;
      console.log(siteProperty, newValue, siteId);
      dbHelpers.updateSite(siteProperty, newValue, siteId)
        .then((siteProperty, newValue, siteId) => {
          console.log(siteProperty, newValue, siteId);
          console.log('success');
          res.message('test');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .delete("delete", (req, res) => {
      console.log(req.body);
    });
  return router;
};
