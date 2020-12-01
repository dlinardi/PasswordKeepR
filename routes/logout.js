const express = require('express');
const router = express.Router();

module.exports = () => {
  router
    .get("/", (req, res) => {
      console.log("get logout");
      req.session = null;
      res.redirect("/login");
    })
    .post('/', (req, res) => {
      console.log("post logout");
      req.session = null;
      res.redirect('/login');
    });

  return router;
};




