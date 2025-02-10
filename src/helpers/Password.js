const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  } catch (err) {
    return err;
  }
};

const CompareHashPassword = async (password, userPassword) => {
  try {
    const comparePassword = await bcrypt.compare(password, userPassword);
    if (!comparePassword) {
      throw new Error("Senha Inválida.");
    }
    return comparePassword;
  } catch (err) {
    return err;
  }
};

module.exports = { hashPassword, CompareHashPassword };
