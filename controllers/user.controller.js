const Users = require("../models/users");

const getAllParticipants = async (req, response) => {
  let user = await Users.find({ role: "USER" });
  response.status(200).send({
    responseCode: "00",
    responseMessage: "Participants fetched successfully",
    data: user,
  });
};

module.exports = getAllParticipants;
