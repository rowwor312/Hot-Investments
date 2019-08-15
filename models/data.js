module.exports = function (sequelize, DataTypes) {
  var User_data = sequelize.define("User_data", {
    expense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spent: {
      type: DataTypes.INTEGER,
      default: 0
    }
  });

  User_data.associate = function(models) {
    User_data.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User_data;
};
