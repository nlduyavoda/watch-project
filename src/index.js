const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3001;

const db = require("./config/db");
const route = require("./routes");
const { Router } = require("express");
const methodOverride = require("method-override");
//cau hinh passport
var bodyParser = require("body-parser");
var passport = require("passport");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

//--------
var session = require("express-session");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("express-flash");
var bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
// var sessionMiddleware = require('./app/middleware/session.middleware')
var expressValidator = require("express-validator"); //express-validator
app.use(expressValidator());
const MongoStore = require("connect-mongo")(session);
require("./config/passport");
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(sessionMiddleware)
app.use(
  session({
    secret: "adsa897adsa98bs",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 60 * 60 * 24 },
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  console.log(session);
  next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
//-----Duong dan cho view
app.set("views", path.join(__dirname, "resource/views"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.use(methodOverride("_method"));
//connect to db
db.connect();
//rout init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
