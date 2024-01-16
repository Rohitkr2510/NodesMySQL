const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const Patient = require('../models/patient');

exports.registration = async (req, res, next) => {
    console.log('From body', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw next(error);
    } 

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const patient_photo = req.body.patient_photo;
    try {
        const hashedPw = await bcrypt
            .hash(password, 12)

        const patient =await Patient.create({
            email: email,
            password: hashedPw,
            name: name,
            address: address,
            phone_number: phone_number,
            patient_photo: patient_photo,
            psychiatristId:  Math.floor(Math.random() * 20) + 1
        })
        
        res.status(201).json({
            message: 'User created!',
            patient: patient
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}