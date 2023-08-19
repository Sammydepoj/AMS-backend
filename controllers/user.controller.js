const Users = require("../models/users");
const { RoleType } = require("../utils/constant");

module.exports.UsersController = class UsersController {
  static async getAllParticipants(request, response) {
    if (request.user?.role !== RoleType.ADMIN) {
      return response.status(403).send({
        responseCode: "86",
        responseMessage: "Forbidden user",
        data: null,
      });
    }
    const user = await Users.find({ role: "USER" });
    response.status(200).send({
      responseCode: "00",
      responseMessage: "Participants fetched successfully",
      data: user,
    });
  }

  static async getUserInfo(request, response) {
    const user = await Users.findById({ _id: request.user._id });
    response.status(200).send({
      responseCode: "00",
      responseMessage: "User info fetched",
      data: user,
    });
  }
};
