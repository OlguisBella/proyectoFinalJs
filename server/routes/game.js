var express = require('express');
var router = express.Router();

router.get('/welcome', function(req, res, next) {
  res.render('home', {page:'Home', menuId:''});
});

router.get('/', function(req, res, next) {
  res.render('index', {page:'Game', menuId:'game'});
});

router.get('/puntuaciones', function(req, res, next) {
  res.render('puntuacion', {page:'Puntuacion', menuId:'puntuaciones'});
});

router.get('/admin', function(req, res, next) {
  res.render('admin', {page:'Administrador', menuId:'admin'});
});

//Para las imagenes


module.exports = router;