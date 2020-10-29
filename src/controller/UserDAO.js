"use strict";

const User = require("../models/User");
const { editPassword } = require("./helper");

class UserDAO {
  constructor(
    firstName,
    lastName,
    username,
    password,
    cpf,
    email,
    telephone,
    isAdmin
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.cpf = cpf;
    this.email = email;
    this.telephone = telephone;
    this.isAdmin = isAdmin;
  }

  async registerUser() {
    try {
      let data = new User({
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        cpf: this.cpf,
        email: this.email,
        telephone: this.telephone,
        isAdmin: this.isAdmin,
      });
      console.log(data);
      return data.save();
    } catch (e) {
      console.log(e);
      return false;
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
      let user = await User.findOne({ username: username }).lean();
      return user;
    } catch (e) {
      return false;
    }
  }

  static async editUser(username, userChanges) {
    try {
      userChanges = editPassword(userChanges);
      let user = await User.findOneAndUpdate(
        { username: username },
        userChanges
      );

      return { error: false, ...user.save() };
    } catch (e) {
      console.log(e);
      return { error: true, info: "Problema com edição do usuário!" };
    }
  }

  static async dropUser(username, userChanges) {
    try {
      let user = await User.deleteOne({ username: username });
      return user.save();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = UserDAO;
