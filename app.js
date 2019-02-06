const User = require('./server/models').User;
const Carta = require('./server/models').Carta;
const Avatar = require('./server/models').Avatar;
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var gameRouter = require('./server/routes/game');
var createError = require('http-errors');
var path = require('path');
var formidable = require('express-form-data');
const methodOverride = require('method-override');
const config = require('./server/config/config-token');

const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

var db = require('./server/models');
const session = require('express-session');
var http = require('http');

// Set up the express app
const app = express();


//Crea user, avatars y cartas por defecto
var cartas = [], avatars = [];
avatars.push({nombre:"NiñaAv1", url:"./images/AVATAR/niñaAv1.png"});
avatars.push({nombre:"NiñaAv2", url:"./images/AVATAR/niñaAv2.png"});
avatars.push({nombre:"NiñaAv3", url:"./images/AVATAR/niñaAv3.png"});
avatars.push({nombre:"NiñoAv1", url:"./images/AVATAR/niñoAv1.png"});
avatars.push({nombre:"NiñoAv2", url:"./images/AVATAR/niñoAv2.png"});
avatars.push({nombre:"NiñoAv3", url:"./images/AVATAR/niñoAv3.png"});
cartas.push({nombre:"Cerdito", url:"./images/ANIMALITOS/cerdito.png",score:10});
cartas.push({nombre:"Conejo", url:"./images/ANIMALITOS/conejo.png",score:20});
cartas.push({nombre:"Gallito", url:"./images/ANIMALITOS/gallito.png",score:30});
cartas.push({nombre:"Gatito", url:"./images/ANIMALITOS/gatito.png",score:40});
cartas.push({nombre:"Patito", url:"./images/ANIMALITOS/patito.png",score:50});
cartas.push({nombre:"Perrito", url:"./images/ANIMALITOS/perrito.png",score:60});
cartas.push({nombre:"Oveja", url:"./images/ANIMALITOS/oveja.png",score:70});
cartas.push({nombre:"Vaca", url:"./images/ANIMALITOS/vaca.png",score:80});
cartas.push({nombre:"Tortuga", url:"./images/ANIMALITOS/tortuga.png",score:90});
cartas.push({nombre:"Pez", url:"./images/ANIMALITOS/pez.png",score:100});
User.findOne({ where: { username: "admin" } })
  .then(user => {
    if (user) { console.log("Admin ya creado"); } 
    else {
      User.create({nombre: "admin",username: "admin",password: "admin",})
        .then(user => {
          return user
            .update({nombre: user.nombre,username: user.username,password: user.generateHash("admin"),})
            .then(() => {console.log("Nuevo admin creado")})
            .catch((error) => {console.log(error);});
        })
        .catch(error => {console.log(error)});
    }
  });
cartas.forEach(element => {
  Carta.findOne({ where: { nombre: element.nombre } })
    .then(carta => {
      if (carta) { console.log("Carta ya creada"); } 
      else {
        Carta.create({nombre: element.nombre,url: element.url,score: element.score})
          .then(() => {console.log("Nueva carta creada")})
          .catch(error => {console.log(error)});
      }
    });
});
avatars.forEach(element => {
  Avatar.findOne({ where: { nombre: element.nombre } })
    .then(avatar => {
      if (avatar) { console.log("Avatar ya creado"); } 
      else {
        Avatar.create({nombre: element.nombre,url: element.url,})
          .then(() => {console.log("Nuevo avatar creado")})
          .catch(error => {console.log(error)});
      }
    });
});
//Fin de creacion de datos por defecto


app.listen(process.env.PORT || 3000, function () {
  console.log('Your node js server is running');
});
/*
db.sequelize.sync().then(function () {
  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
});
*/


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




module.exports = app;