const avatarController = require('../controllers').avatar;
const jugadorController = require('../controllers').jugador;
const cartaController = require('../controllers').carta;
const userController = require('../controllers').user;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  //POST create
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