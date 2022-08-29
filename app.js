const express = require('express'),
       path = require('path');
      // morgan = require('morgan'),
const ejs=require('ejs');
const bodyParser = require('body-parser');
var session = require('express-session');
const app = express();
var cookieParser = require('cookie-parser');
//var flash = require('connect-flash');
app.use(bodyParser());
console.time("start-server")
// importing routes

const panierRoutes = require('./src/route/panierRoute');
//var passport = require('passport');
const {sequelize}=require("./src/model/config");


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// settings
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//require('./config/passport')(passport); // pass passport for configuration


//require('./route/siteRoutes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("secret")); // read cookies (needed for auth)
const throng = require('throng')
//app.use(flash());
const operationRoutes = require("./src/route/siteRoutes");
app.use('/', operationRoutes);
console.timeEnd("start-server")
// starting the server


app.listen(app.get('port'), () => {

    console.log(`server on port ${app.get('port')}`);
  });

