const User = require("../models/User");

class Authentication {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.loginType = loginType;
  }

  async userAuth() {
    if (this.checkUserAndPassword()) {
      return { status: true };
    }
  }

  async checkUserAndPassword() {
    try {
      const { password, _id } = await User.findOne({
        username: this.username,
      });
      return this.getPassAndToken(password, _id);
    } catch (e) {
      console.log(e);
      return { error: true, status: "Connectivity Problems with the API" };
    }
  }

  getPassAndToken(password, id) {
    if (this.comparePassword(this.password, password).status) {
      const token = jwt.sign({ id }, process.env.TOKEN_SECRET);
      return { auth: true, token };
    } else {
      return { auth: false, token: null };
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
