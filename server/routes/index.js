const avatarController = require('../controllers').avatar;
const jugadorController = require('../controllers').jugador;
const cartaController = require('../controllers').carta;
const userController = require('../controllers').user;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/api/avatars', avatarController.create);
  app.post('/api/jugadores', jugadorController.create);
  app.post('/api/cartas', cartaController.create);
  app.post('/api/users', userController.create);

};