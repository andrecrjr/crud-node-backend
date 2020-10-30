const User = require("../models/User");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Authentication {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async userAuth() {
    if (this.checkUserAndPassword()) {
      return { status: true };
    }
  }

  async checkUserAndPassword() {
    try {
      const { password, _id, isAdmin } = await User.findOne({
        username: this.username,
      });
      return { ...this.getPassAndToken(password, _id), isAdmin };
    } catch (e) {
      return {
        error: true,
        info: "Problema de conectividade com a API, tente novamente.",
      };
    }
  }

  getPassAndToken(password, id) {
    if (this.comparePassword(this.password, password).status) {
      const token = jwt.sign({ id }, process.env.TOKEN_SECRET);
      return { auth: true, token };
    } else {
      return {
        auth: false,
        token: null,
        error: true,
        info: "Password não está correto, tente novamente.",
      };
    }
  }

  comparePassword(plainText, password) {
    let data = Bcrypt.compareSync(plainText, password);
    if (data) {
      return { status: true };
    } else {
      return { status: false };
    }
  }
}

module.exports = Authentication;
