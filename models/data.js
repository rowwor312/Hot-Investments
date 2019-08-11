module.exports = function (sequelize, DataTypes) {
  var UserData = sequelize.define("User_data", {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    },
});

  UserData.associate = function (models) {
    UserData.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserData;
};