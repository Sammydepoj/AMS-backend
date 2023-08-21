const Joi = require("joi");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");
const { RoleType, ApprovalStatus } = require("../utils/constant");
const User = require("../models/users");

const signin = async (request, response) => {
  const schema = Joi.object({
    email: Joi.string().min(1).required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(request.body);

  if (error)
    return response.status(400).send({
      responseCode: "95",
      responseMessage: error.details[0]?.message,
      data: null,
    });
  try {
    let user = await User.findOne({ email: request.body.email });
    if (!user)
      return response.status(400).send({
        responseCode: "94",
        responseMessage: "Invalid email or password",
        data: null,
      });
    const validatePassword = await bcrypt.compare(
      request.body?.password,
      user.password
    );
    if (!validatePassword)
      return response.status(400).send({
        responseCode: "93",
        responseMessage: "Invalid email or password",
        data: null,
      });
    if (
      user.approvalStatus === ApprovalStatus.PENDING &&
      user.role !== RoleType.ADMIN
    )
      return res.status(200).send({
        responseCode: "96",
        responseMessage: "Kindly verify your account to proceed",
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          sex: user.sex,
          dob: user.dob,
          lga: user.lga,
          homeAddress: user.homeAddress,
          programme: user.programme,
          occupation: user.occupation,
          education: user.education,
          classOfDegree: user.classOfDegree,
          instituitionAttended: user.instituitionAttended,
          yearOfGraduation: user.yearOfGraduation,
          computerSkill: user.computerSkill,
          softwareUsed: user.softwareUsed,
          softwareTraining: user.softwareTraining,
          applicationYouWillBuild: user.applicationYouWillBuild,
          techStack: user.techStack,
          preferredJob: user.preferredJob,
          workSector: user.workSector,
          reasonForScholarship: user.reasonForScholarship,
          commitment: user.commitment,
          approval: user.approval.ApprovalStatus.PENDING,
          approvedBy: user.approvedBy,
          approvedDate: user.approvedDate,
          isDeactivated: user.isDeactivated,
          isReactivated: user.isReactivated,
          dateCreated: user.dateCreated,
          dateUpdated: user.dateUpdated,
          startDate: user.startDate,
          endDate: user.endDate,
        },
      });
    const token = createToken(user);
    response.status(200).send({
      responseCode: "00",
      responseMessage: "Login successful",
      data: {
        role: user.role,
        token,
      },
    });
  } catch (error) {
    response.status(500).send({
      responseCode: "95",
      responseMessage: "Internal server error",
      data: null,
    });
    console.log(error);
  }
};

exports.signin = signin;
