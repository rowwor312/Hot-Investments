var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  app.post("/api/user", function(req, res) {
    db.User.create(req.body)
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(result) {
      res.json(result)
    })
  })
  app.post("/api/category", function(req, res) {
    db.Category.create(req.body)
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
  // POST route for saving a new expense
  app.post("/api/expense", function(req, res) {
    db.User_data.create(req.body)
      .then(function(dbPost) {
        res.json(dbPost);
      });
  })
}