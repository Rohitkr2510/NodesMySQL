const express = require('express');
const { body } = require('express-validator');

const hospitalController = require('../controllers/hospital');
const authController = require('../controllers/auth');
const Patient = require('../models/patient');

const router = express.Router();

router.get('/', hospitalController.getHospital);

router.post('/:hospitalId', hospitalController.getHospitalById);

router.post(
    '/registration',
    [
        body('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Name is required.'),

        body('address')
            .trim()
            .isLength({ min: 10 })
            .withMessage('Address should be at least 10 characters.'),

        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail()
            .custom((value) => {
                return Patient.findOne({
                    where: {
                        email: value
                    }
                }).then(patientDoc => {
                    if (patientDoc) {
                        return Promise.reject('Email address already exists!');
                    }
                });
            }),

        body('phone_number')
            .matches(/^\+[1-9]\d{1,14}$/)
            .withMessage('Please enter a valid phone number with country code.'),

        body('password')
            .trim()
            .isLength({ min: 8, max: 15 })
            .withMessage('Password must be between 8 and 15 characters.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/)
            .withMessage('Password must contain at least one upper character, one lower character, and a number.'),

        // Additional validation for patient photo if needed

    ],
    authController.registration
);


module.exports = router;