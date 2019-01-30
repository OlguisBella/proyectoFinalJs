const Jugador = require('../models').Jugador;

module.exports = {
  create(req, res) {
    return Jugador
      .create({
        puntaje: req.body.puntaje,
        avatarId: req.body.avatarId,
      })
      .then(jugador => res.status(201).send(jugador))
      .catch(error => res.status(400).send(error));
  },
};