module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define("User_data", {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Category.associate = function(models) {
    Category.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Category;
};
