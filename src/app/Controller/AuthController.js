const User = require("../models/User");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);
const jsonwebtoken = require("jsonwebtoken");
const { use } = require("passport");
const { deleteOne } = require("../models/User");
const csrf = require("csurf");

class AuthController {
  // registerview(req, res, next) {
  //    var messages = req.flash('errors')
  //   res.render("auth/register",{csrfToken:req.csrfToken(),messages: messages,hasError: messages.length > 0})
  //   }
  loginview(req, res, next) {
    var messages = req.flash("error");
    res.render("auth/login", {
      csrfToken: req.csrfToken(),
      messages: messages,
      hasError: messages.length > 0,
    });
  }
  profile(req, res, next) {
    res.render("auth/profile");
  }
}
module.exports = new AuthController();
