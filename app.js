const express = require('express');
      // path = require('path'),
      // morgan = require('morgan'),
const ejs=require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());

// importing routes
const operationRoutes = require("./route/siteRoutes");
const panierRoutes = require('./route/panierRoute');
// settings
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// routes
app.use('/', operationRoutes);
app.use('/panier', panierRoutes);
// starting the server
app.listen(app.get('port'), () => {
  console.log(app.get("host"))
    console.log(`server on port ${app.get('port')}`);
  });

