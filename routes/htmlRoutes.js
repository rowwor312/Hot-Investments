var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // Load example page and pass in an example by id
  app.get("/category/:id", function(req, res) {
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
            [db.sequelize.fn("sum", db.sequelize.col("spent")), "total_spent"]
          ]
        }
      ]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/users/:id", function(req, res) {
    db.sequelize
      .query(
        "SELECT `User`.`id`, `User`.`userName`, `User`.`totalBudget`, `Categories->useExp`.`id` AS `Categories.useExp.id`, sum(`spent`) AS `Categories_useExp_total_spent` FROM `Users` AS `User` LEFT OUTER JOIN `Categories` AS `Categories` ON `User`.`id` = `Categories`.`UserId` LEFT OUTER JOIN `useExps` AS `Categories->useExp` ON `Categories`.`id` = `Categories->useExp`.`CategoryId` WHERE `User`.`id` = '1'",
        { type: db.Sequelize.QueryTypes.SELECT }
      )
      .then(function(data) {
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
        }).then(function(dbCat) {
          var balance = data[0].totalBudget - Number(data[0]["Categories_useExp_total_spent"]);
          var numCat = dbCat.length;

          var gagueValues = [];
          for (let i = 0; i < numCat; i++) {
            gagueValues.push({category: dbCat[i].category, total_spent: dbCat[i].useExps[0].total_spent, gagueId: "chart-container" + i})
          }

          res.render("budgetapp", { top: data[0], gague: gagueValues, balance: balance, numCat: numCat });
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
