const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars');
const app = express()
const port = 3000

const db = require('./config/db')
const route = require('./routes');
const { Router } = require('express');
const methodOverride = require('method-override')

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname,'public')))

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

app.set('views',path.join(__dirname,'resource/views'))

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
//connect to db
db.connect()
//rout init
route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})