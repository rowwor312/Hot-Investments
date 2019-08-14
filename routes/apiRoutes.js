
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our ____ model
var db = require("../models");

// Routes
// =============================================================

module.exports = function(app) {
  console.log(db.User_data)
  app.post("/api/user", function(req, res) {
    console.log(req.body);
    db.User.create(req.body)
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/users", function(req, res){
    db.User.findAll({}).then(function(result){
      res.json(result)
    })
  })

  app.post("/api/category", function(req, res) {
    console.log(req.body);
    db.category.create(req.body)
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
    
   // POST route for saving a new expense
  app.post("/api/expense", function(req, res) {
    console.log(req.body);
    db.User_data.create(req.body)
      .then(function(dbPost) {
        res.json(dbPost);
      });
  })
}

  // DELETE route for deleting _______
  // app.delete("/api/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
