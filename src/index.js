const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars');
const app = express()
const port = 3001

const db = require('./config/db')
const route = require('./routes');
const { Router } = require('express');
const methodOverride = require('method-override')

var session = require('express-session')
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
const jsonwebtoken  = require('jsonwebtoken')

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
  }))
  app.use(flash());
  app.use(passport.initialize())
  app.use(passport.session());
  //-----
  app.set('views',path.join(__dirname,'resource/views'))
  
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());

app.engine(
  'hbs', 
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a,b) => a + b,
    }
  }),
);
app.set('view engine', 'hbs');
app.use(methodOverride('_method'))
//connect to db
db.connect()
//rout init
route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})