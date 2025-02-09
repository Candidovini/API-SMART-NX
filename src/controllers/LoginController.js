const { userLogin } = require("../services/LoginService");

const loginController = async (req, res) => {
  try {
    const data = req.body;
    const response = await userLogin(data);

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = { loginController };
