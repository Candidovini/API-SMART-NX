const { Users } = require("../../models");
const { hashPassword } = require("../helpers/Password");

const getAllUsers = async () => {
  const getAll = await Users.findAll({
    attributes: { exclude: ["password"] },
  });

  return getAll;
};

const getByUsername = async (username) => {
  const findOne = await Users.findOne({
    where: { username },
    attributes: { exclude: ["password"] },
  });

  if (!findOne) return false;

  return findOne;
};

const createUser = async ({ username, name, password }) => {
  const verifyUserName = await getByUsername(username);
  const hashPass = await hashPassword(password);
  if (verifyUserName) throw new Error(`User ${username} already exists`);
  const user = await Users.create({ username, name, password: hashPass });
  return user;
};

module.exports = { getAllUsers, getByUsername, createUser };
