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

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
    function (req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  app.get("/api/gauges/:id", function (req, res) {
    db.Category.findAll({
      where: {
        Userid: req.params.id
      },
      attributes: ["category"],
      group: ["category"],
      include: [
        {
          model: db.useExp,
          attributes: [
            [
              db.sequelize.fn("sum", db.sequelize.col("spent")),
              "total_spent"
            ]
          ]
        }
      ]
    }).then(function (dbCat) {
      var numCat = dbCat.length;

      var gagueValues = [];
      for (let i = 0; i < numCat; i++) {
        gagueValues.push({ category: dbCat[i].category, total_spent: dbCat[i].useExps[0].total_spent, gagueId: "chart-container" + i })
      }
      var info = { gague: gagueValues, numCat: numCat }
      res.json(info)
    });
  });
}