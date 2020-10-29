const { use } = require("../routes");

const Bcrypt = require("bcryptjs");

const editPassword = (userChanges) => {
  if (Object.keys(userChanges).includes("password")) {
    userChanges = {
      ...userChanges,
      password: Bcrypt.hashSync(userChanges.password),
    };
  }
  return userChanges;
};

module.exports = { editPassword };
