const { DataTypes, Sequelize, ABSTRACT, STRING } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("genre", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {type: DataTypes.STRING},
    })
};