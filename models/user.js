module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
        msg: "Name must be at least 5 characters in length."
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 25],
        msg: "Password must be between 10 and 25 characters in length."
      }
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return User;
};
