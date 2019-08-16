module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
        // msg: "Name must be at least 5 characters in length."
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 25]
        // msg: "Password must be between 10 and 25 characters in length."
      }
    },
    totalBudget: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Category, {
      onDelete: "cascade"
    });
  };
  return User;
};
