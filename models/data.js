module.exports = function(sequelize, DataTypes) {
  var useExp = sequelize.define("useExp", {
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

  useExp.associate = function(models) {
    useExp.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return useExp;
};
