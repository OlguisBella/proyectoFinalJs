const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var gameRouter = require('./server/routes/game');
var createError = require('http-errors');
var path = require('path');
var formidable = require('express-form-data');
const methodOverride = require('method-override');
const config = require('./server/config/config-token');


const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Set up the express app
const app = express();

const User = require('./server/models').User;


require('./server/config/passport')(passport);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(formidable.parse({
  keepExtensions: true,
  uploadDir: "server/public/images/ANIMALITOS"
}));

//use for override and can use put or delete
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.use(cookieParser('asdf33g4w4hghjkuil8saef345'));
const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);
// required for passport
app.use(session({
  secret: 'asdf33g4w4hghjkuil8saef345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: cookieExpirationDate // use expires instead of maxAge
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/*
 * STATIC FILES
 */
//app.use(express.static('./server/public'));
app.use(express.static(path.join(__dirname, './server/public')));

/*
 * ROUTES
 */
// Require our routes into the application.
require('./server/routes')(app);
require('./server/routes/auth')(app, passport);
app.use('/', gameRouter);

/*
 * SETTINGS
 */
//set secret
app.set('Secret', config.secret);

//Configuracion para frontend
// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');


/*
 * MIDDLEWARES
 */



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//Create user
User.findOne({
    where: {
      username: "admin"
    }
  })
  .then(user => {
    if (user) {
      //return done(null, false, req.flash('signupMessage', 'the username is already taken'));
      console.log("Admin ya creado");
    } else {
      User.create({
          nombre: "admin",
          username: "admin",
          password: "admin",
        })
        .then(user => {
          return user
            .update({
              nombre: user.nombre,
              username: user.username,
              password: user.generateHash("admin"),
            })
            .then(() => {console.log("Nuevo admin creado")})
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error)
        });
    }
  });


module.exports = app;