const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Psychiatrist = sequelize.define('psychiatrist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Psychiatrist;