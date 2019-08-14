var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/users/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'models.User.userName',
        'models.User.income'
      ],
      include: [
        {
          model: db.Category,
          include: [
            {
              model: db.UserData,
              attributes: [[models.sequelize.fn('sum', models.sequelize.col('spent')), 'total_spent']]
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
