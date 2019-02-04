const express = require('express');
const avatarController = require('../controllers').avatar;
const jugadorController = require('../controllers').jugador;
const cartaController = require('../controllers').carta;
const userController = require('../controllers').user;
const ProtectedRoutes = express.Router();
const jwt    = require('jsonwebtoken');


module.exports = (app) => {
  //set secret
  ProtectedRoutes.use((req, res, next) => {
    // check header for the token
    var token = req.headers['access-token'];
    console.log("Mi token: " +token);
    // decode token
    if (token) {
      // verifies secret and checks if the token is expired
      jwt.verify(token, app.get('Secret'), (err, decoded) => {
        if (err) {
          return res.json({
            message: 'invalid token'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token  
      res.send({
        message: 'No token provided.'
      });
    }
  });

  //Autentication
  app.use('/apis', ProtectedRoutes);
  app.post('/auth', userController.auth);

  //app.get('/api', (req, res) => res.status(200).send({
  //  message: 'Welcome to the API!',
  //}));

  //POST create
  //ProtectedRoutes.post('/avatars', avatarController.create);
  app.post('/api/avatars', avatarController.create);
  app.post('/api/jugadores', jugadorController.create);
  app.post('/api/cartas', cartaController.create);
  app.post('/api/users', userController.create);

  //GET list
  app.get('/api/avatars', avatarController.list);
  app.get('/api/jugadores', jugadorController.list);
  app.get('/api/cartas', cartaController.list);
  app.get('/api/users', userController.list);

  app.post('/api/jugadores/:avatarId/avatar', jugadorController.create);

  //GET one element
  app.get('/api/avatar/:avatarId', avatarController.retrieve);
  app.get('/api/jugador/:jugadorId', jugadorController.retrieve);
  app.get('/api/carta/:cartaId', cartaController.retrieve);
  app.get('/api/user/:userId', userController.retrieve);

  //PUT update
  app.put('/api/avatar/:avatarId', avatarController.update);
  app.put('/api/jugador/:jugadorId', jugadorController.update);
  app.put('/api/carta/:cartaId', cartaController.update);
  app.put('/api/user/:userId', userController.update);

  //DELETE one element
  app.delete('/api/avatar/:avatarId', avatarController.destroy);
  app.delete('/api/jugador/:jugadorId', jugadorController.destroy);
  app.delete('/api/carta/:cartaId', cartaController.destroy);
  app.delete('/api/user/:userId', userController.destroy);

};