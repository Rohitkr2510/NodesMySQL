const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Hospital = sequelize.define('hospital', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hospital_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Hospital;