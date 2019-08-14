module.exports = function (sequelize, DataTypes) {
  var UserData = sequelize.define("User_data", {
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

  UserData.associate = function (models) {
    UserData.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserData;
};
