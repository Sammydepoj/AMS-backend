/*
step 1 - validate client request body using joi library

*/
const Joi = require("joi")
const Users = require("../models/users")
const { sendVerificationMail } = require("../utils/sendVerificationMail");
const sendApprovalMailToAdmin = require("../utils/sendApprovalMailToAdmin");

const enrollParticipants = async (req, res)=>{
    const Schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        sex: Joi.string().required(),
        dob: Joi.string().required(),
        lga: Joi.string().required(),
        homeAddress: Joi.string().required(),
        programme: Joi.string().required(),
        programmeId: Joi.number().required(),
        occupation: Joi.string().required(),
        education: Joi.string().required(),
        classOfDegree: Joi.string().required(),
        instituitionAttended: Joi.string().required(),
        yearOfGraduation: Joi.string().required(),
        computerSkill: Joi.string().required(),
        softwareUsed: Joi.string().required(),
        softwareTraining: Joi.boolean(),
        applicationYouWillBuild: Joi.string().required(),
        techStack: Joi.string().required(),
        preferredJob: Joi.string().required(),
        workSector: Joi.string().required(),
        reasonForScholarship: Joi.string().required(),
        commitment: Joi.boolean(),
    });
    //Registering A User
    // Checking if a user with an existing email is already registered
    const { error } = Schema.validate(req.body)
    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    })

    const { 
        firstName, 
        lastName, 
        email, 
        phoneNumber,
        sex,
        dob,
        lga,
        homeAddress,
        programme,
        programmeId,
        occupation,
        education,
        classOfDegree,
        instituitionAttended,
        yearOfGraduation,
        computerSkill,
        softwareUsed,
        softwareTraining,
        applicationYouWillBuild,
        techStack,
        preferredJob,
        workSector,
        reasonForScholarship,
        commitment

     } = req.body
    try {
        let user = await Users.findOne({email});
        const admin = await Users.findOne({ role: "ADMIN", programmeId })
       
        if (user) return res.status(400).send({
            responseCode: "96",
            responseMessage: "email already exists",
            data: null
        })
        
        user = new Users({
            firstName,
            lastName,
            email,
            phoneNumber,
            sex,
            dob,
            lga,
            homeAddress,
            programme,
            occupation,
            education,
            classOfDegree,
            instituitionAttended,
            yearOfGraduation,
            computerSkill,
            softwareUsed,
            softwareTraining,
            applicationYouWillBuild,
            techStack,
            preferredJob,
            workSector,
            reasonForScholarship,
            commitment,
            isVerified: false,
            isDeactivated: false,
            isReactivated: false,
            dateCreated: new Date().toJSON(),
            dateUpdated: null,
            startDate: null,
            endDate: null,
            password: Math.floor(Math.random() * 100000) + 1000000
        })
    
        await user.save()
        sendVerificationMail(user)
        setTimeout(() => {
            sendApprovalMailToAdmin(admin, user)
        }, 5000);
        res.status(201).send({
            responseCode: "00",
            responseMessage: "enrollment successful",
            data: user
        })
        // console.log(error);
    } catch (error) {
        res.status(500).send({
            responseCode: "95",
            responseMessage:"internal server error",
            data: null
        })
        console.log(error)
    }
};

module.exports = enrollParticipants