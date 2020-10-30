"use strict";

const User = require("../models/User");
const { editPassword } = require("./helper");

class UserDAO {
  constructor(name, username, password, cpf, email, telephone, isAdmin) {
    this.name = name;
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
        name: this.name,
        password: this.password,
        cpf: this.cpf,
        email: this.email,
        telephone: this.telephone,
        isAdmin: this.isAdmin,
      });
      return data.save();
    } catch (e) {
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
      user;
      return { error: false, info: `Editado com sucesso` };
    } catch (e) {
      e;
      return { error: true, info: "Problema com edição do usuário!" };
    }
  }

  static async dropUser(username) {
    try {
      let user = await User.deleteOne({ username: username });
      user.deletedCount;
      return user.deletedCount > 0 && true;
    } catch (e) {
      e;
      return false;
    }
  }
}

module.exports = UserDAO;
