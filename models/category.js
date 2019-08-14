module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Category.associate = function(models) {
    Category.belongsTo(models.User_data, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Category;
};
