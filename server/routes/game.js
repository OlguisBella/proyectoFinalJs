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

<<<<<<< HEAD
//Para las imagenes


=======
>>>>>>> 88b9090a2d553778c81f64d39cb6bf8ce8f541f1
module.exports = router;