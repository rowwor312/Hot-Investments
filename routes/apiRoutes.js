var db = require("../models");
// Routes
// =============================================================
module.exports = function (app, passport) {
  app.post("/api/user", function (req, res) {
    db.User.create(req.body)
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (result) {
      res.json(result)
    })
  })
  app.post("/api/category", function (req, res) {
    db.Category.create(req.body)
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });
  // POST route for saving a new expense
  app.post("/api/expense", function (req, res) {
    db.User_data.create(req.body)
      .then(function (dbPost) {
        res.json(dbPost);
      });
  })

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/profile", // redirect to the secure profile section
    failureRedirect: "/signup", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // process the login form
  app.post("/login", passport.authenticate("local-login", {
    successRedirect: "/profile", // redirect to the secure profile section
    failureRedirect: "/login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
    function (req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    });

   
  };
