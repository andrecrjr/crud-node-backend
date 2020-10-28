"use strict";

const User = require("../models/User");

class UserDAO {
  constructor(
    firstName,
    lastName,
    username,
    password,
    cpf,
    email,
    telephone,
    loginType
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.cpf = cpf;
    this.email = email;
    this.telephone = telephone;
    this.loginType = loginType;
  }

  registerUser() {
    try {
      let data = new User({
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        cpf: this.cpf,
        email: this.email,
        telephone: this.telephone,
      });
      return data.save();
    } catch (e) {
      return e;
    }
  }

  static async checkUsers() {
    try {
      let data = await User.find().lean();
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  static async findUser(username) {
    try {
      let user = await User.find({ username: username }).lean();
      return user;
    } catch (e) {
      return e;
    }
  }

  static async editUser(username, userChanges) {
    try {
      let user = await User.findOneAndUpdate(
        { username: username },
        userChanges
      );
      return user.save();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = UserDAO;
