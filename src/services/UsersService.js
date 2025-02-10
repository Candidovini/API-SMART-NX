const { Users } = require("../../models");
const { hashPassword } = require("../helpers/Password");

const getByUsername = async (username) => {
  const findOne = await Users.findOne({
    where: { username },
    attributes: { exclude: ["password"] },
  });

  if (!findOne) return false;

  return findOne;
};

const createUser = async ({ username, name, password }) => {
  if (!username) throw new Error("Usename must be provided");
  const verifyUserName = await getByUsername(username);
  const hashPass = await hashPassword(password);
  if (verifyUserName) throw new Error(`User ${username} already exists`);
  await Users.create({ username, name, password: hashPass });
  return;
};

module.exports = { getByUsername, createUser };
