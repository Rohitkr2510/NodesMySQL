const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Patient = sequelize.define('patient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    patient_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: /^\+[1-9]\d{1,14}$/,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    patient_photo: {
        type: Sequelize.STRING,
        allowNull: true
      },
});

module.exports = Patient;