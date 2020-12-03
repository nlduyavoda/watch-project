const express = require("express");
const router = express.Router();
const authController = require("../app/Controller/AuthController");
const Products = require("../app/models/Products");
const Cart = require("../app/models/cart");
const jsonwrbtoken = require("jsonwebtoken");
const csrf = require("csurf");
const session = require('express-session')
const passport = require("passport");
var varlidator = require("express-validator");
var flash = require("express-flash");
const { route } = require("./news");

const csrfProtection = csrf();
router.use(csrfProtection);

router.get("/register", function (req, res, next) {
  var messages = req.flash("errors");
  res.render("auth/register", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});
router.post(
  "/register",
  passport.authenticate("local.register", {
    successRedirect: "/auth/login",
    failureRedirect: "/auth/register",
    failureFlash: true,
  })
);
//-----
router.get("/profile", authController.profile);
// router.post("/login", authController.login);
router.get("/login", function (req, res, next) {
  var messages = req.flash("errors");
  res.render("auth/login", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
    layout: 'detail.hbs'
  });
});
router.post(
  "/login",
  passport.authenticate("local.login", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);


router.get('/card-detail',function(req,res,next){
  if(!req.session.cart){
    console.log(req.session.cart)
    console.log(req.session.cart._id)
        return res.render('shop/card-detail',{products:cart.generateArray(),layout: 'detail.hbs' })
  }
  var cart = new Cart(req.session.cart)
  console.log(req.session.cart)
  console.log(req.session.cart._id)

  return res.render('shop/card-detail',{products:cart.generateArray(),layout: 'detail.hbs'})
})
module.exports = router;
 