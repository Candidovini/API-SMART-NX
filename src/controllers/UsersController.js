const { createUser } = require("../services/UsersService");
const { FormatedResponse } = require("../helpers/FormattedResponse");

const createUserController = async (req, res) => {
  try {
    const data = req.body;
    await createUser(data);

    return res.status(201).send(FormatedResponse.true('User created successfully'));
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
  }
};

module.exports = { createUserController };
