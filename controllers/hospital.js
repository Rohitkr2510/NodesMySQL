const sequelize = require('../util/database');
const Hospital = require('../models/hospital');
const Patient = require('../models/patient');
const Psychiatrist = require('../models/psychiatrist');

exports.getHospital = (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to hospital management',
    });
};

exports.getHospitalById = async (req, res, next) => {
    try {
        const { hospitalId } = req.params;

        if (!hospitalId) {
            return res.status(400).json({ error: 'Hospital ID is required in the request parameters' });
        }

        //Finding the hospital of given id
        const hospital = await Hospital.findByPk(hospitalId);
        //finding the psychiatrists associated with the given hospital id
        const psychiatrists = await Psychiatrist.findAll({ where: { hospitalId: hospitalId } });
        const TotalPsychiatristcount = psychiatrists.length;
        let totalPatientsCount = 0;
        //Finding all patient corresponding to the psychaiatrists
        const psychiatristsWithPatients = await Promise.all(
            psychiatrists.map(async (psychiatrist) => {
                const psychiatristWithPatients = await Patient.findAll({
                    where: {
                        psychiatristId: psychiatrist.id
                    }
                });

                if (!psychiatristWithPatients) {
                    return { psychiatrist, patients: [] };
                }

                const patients = psychiatristWithPatients.length;
                totalPatientsCount += patients;
                return { id: psychiatrist.id, name: psychiatrist.name, Patientscount: patients };
            })
        );

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        res.status(200).json({
            hospitalName: hospital.name,
            TotalPsychiatristcount: TotalPsychiatristcount,
            totalPatientsCount: totalPatientsCount,
            PsychiatristDetails: psychiatristsWithPatients
        });
    } catch (error) {
        next(error);
    }
};




