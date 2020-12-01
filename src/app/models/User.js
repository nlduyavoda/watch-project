const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.method({
  encryptPassword: function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
  },
  validPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
