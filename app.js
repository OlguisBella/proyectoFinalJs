const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var gameRouter = require('./server/routes/game');
var createError = require('http-errors');
var path = require('path');
<<<<<<< HEAD
var formidable = require('express-form-data');
=======
>>>>>>> 88b9090a2d553778c81f64d39cb6bf8ce8f541f1

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD

app.use(formidable.parse({ keepExtensions: true, uploadDir:"server/public/images/ANIMALITOS" }));
=======
>>>>>>> 88b9090a2d553778c81f64d39cb6bf8ce8f541f1

// Require our routes into the application.
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
//app.get('*', (req, res) => res.status(200).send({
  //message: 'Welcome to the beginning of nothingness.',
//}));

//Configuracion para frontend
// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

app.use(express.static('./server/public'));
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set path for static assets
app.use(express.static(path.join(__dirname, './server/public')));

app.use('/', gameRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;