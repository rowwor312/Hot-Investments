module.exports = function (sequelize, DataTypes) {
    var User_data = sequelize.define("User_data", {
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
    return User_data;
};