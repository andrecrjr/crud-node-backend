const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const { ObjectId } = require("mongoose");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	cpf: { type: String, required: true, unique: true },
	isAdmin: { type: Boolean, required: true },
	id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
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
