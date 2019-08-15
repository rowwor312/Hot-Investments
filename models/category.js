module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
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

  Category.associate = function(models) {
    Category.hasMany(models.User_data, {
      onDelete: "cascade"
    });
  };

  return Category;
};
