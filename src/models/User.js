const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpf: { type: Number, required: true, unique: true },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
