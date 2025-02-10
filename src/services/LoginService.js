require("dotenv").config();
const { Users } = require("../../models");
const { CompareHashPassword } = require("../helpers/Password");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const userLogin = async (data) => {
  const { username, password } = data;
  const findUser = await Users.findOne({
    where: { username: username },
  });
  if (!findUser) throw new Error("Usuário Inválido.");
  const hashPass = await CompareHashPassword(password, findUser.password);
  if (!hashPass) throw new Error("Senha Inválida.");
  const token = jwt.sign(
    {
      userId: findUser.id,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
  return {
    token,
    userName: findUser.username,
    name: findUser.name,
  };
};

module.exports = { userLogin };
