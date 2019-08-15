var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  // Load example page and pass in an example by id
  app.get("/category/:id", function (req, res) {
    db.Category.findOne({ 
      where: { 
        id: req.params.id 
      },
      attributes: [
        'category'
      ],
      include: [
        {
          model: db.User_data,
          attributes: [[db.sequelize.fn('sum', db.sequelize.col('spent')), 'total_spent']]
        }
      ]
     }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/users/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'userName',
        'income'
      ], 
      include: [
        {
          model: db.Category,
          attributes: [],
          include: [
            {
              model: db.User_data,
              attributes: [[db.sequelize.fn('sum', db.sequelize.col('spent')), 'total_spent']]
            }
          ]
        }
      ]
      
     
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
