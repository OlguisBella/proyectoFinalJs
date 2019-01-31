var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:''});
});

router.get('/introduccion', function(req, res, next) {
  res.render('introduccion', {page:'Introduccion', menuId:'introduccion'});
});

router.get('/puntuaciones', function(req, res, next) {
  res.render('puntuacion', {page:'Puntuacion', menuId:'puntuaciones'});
});

router.get('/admin', function(req, res, next) {
  res.render('admin', {page:'Administrador', menuId:'admin'});
});


//Para las imagenes


module.exports = router;
