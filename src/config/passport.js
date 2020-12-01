const passport = require("passport");
const User = require("../app/models/User");
const LocalStrategy = require("passport-local").Strategy;
const { check, Body, validationResult } = require("express-validator");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (_id, done) {
  User.findById(_id, function (err, user) {
    done(err, user);
  });
});
passport.use(
  "local.register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      req.checkBody("email", "Invalid email").notEmpty().isEmail();
      req
        .checkBody("password", "Invalid password")
        .notEmpty()
        .isLength({ min: 4 });
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function (error) {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
      }
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: "Email is ready in use" });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = password;
        newUser.save(function (err, result) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      req.checkBody("email", "Invalid email").notEmpty().isEmail();
      console.log(checkBody);
      req.checkBody("password", "Invalid password").notEmpty();
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function (error) {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
      }
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, req.flash("message", "User not found."));
        }
        if (!user.validPassword(password)) {
          return done(null, false, req.flash({ message: "Wrong password." }));
        }
        return done(null, user);
      });
    }
  )
);
