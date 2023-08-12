const Joi = require("joi");
const Users = require("../models/users");

const password = async (req, res) => {
    const schema = Joi.object({
        password: Joi.string().min(8).required()
    });

    const { error } = schema.validate(req.body);

    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    });

    try {
        let user = Users.findOne({email})
    } catch (error) {
        res.status(500).send({
            responseCode: "96",
            responseMessage:"internal server error",
            data: null
        })
        console.log(error)
    }
}

module.exports = password