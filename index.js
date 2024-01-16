require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Patient = require('./models/patient');
const Psychiatrist = require('./models/psychiatrist');
const Hospital = require('./models/hospital');

const app = express();
const hospitalRoutes = require('./routes/hospital');

app.use(bodyParser.json())

app.use(hospitalRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
})

Hospital.hasMany(Psychiatrist);
Psychiatrist.belongsTo(Hospital);
Psychiatrist.hasMany(Patient);
Patient.belongsTo(Psychiatrist);

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        console.log("Server is running");
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
