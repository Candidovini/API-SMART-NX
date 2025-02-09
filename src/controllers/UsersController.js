const { createUser } = require("../services/UsersService");

const createUserController = async (req, res) => {
  try {
    const data = req.body;
    const response = await createUser(data);

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { createUserController };
