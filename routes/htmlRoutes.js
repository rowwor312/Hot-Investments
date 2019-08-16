var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  // Load example page and pass in an example by id
  app.get("/category/:id", function(req, res) {
    db.Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["category"],
      include: [
        {
          model: db.useExp,
          attributes: [
            [db.sequelize.fn("sum", db.sequelize.col("spent")), "total_spent"]
          ]
        }
      ]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/users/:id", function(req, res) {
    db.sequelize.query("SELECT `User`.`id`, `User`.`userName`, `User`.`totalBudget`, `Categories->useExp`.`id` AS `Categories.useExp.id`, sum(`spent`) AS `Categories.useExp.total_spent` FROM `Users` AS `User` LEFT OUTER JOIN `Categories` AS `Categories` ON `User`.`id` = `Categories`.`UserId` LEFT OUTER JOIN `useExp` AS `Categories->useExp` ON `Categories`.`id` = `Categories->useExp`.`CategoryId` WHERE `User`.`id` = '1'",{ type: db.Sequelize.QueryTypes.SELECT }).then(function(data){
      console.log(data)
      res.json(data)
    })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
