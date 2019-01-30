const Jugador = require('../models').Jugador;
const Avatar = require('../models').Avatar;

module.exports = {
  create(req, res) {
    return Jugador
      .create({
        puntaje: req.body.puntaje,
        avatarId: req.params.avatarId,
      })
      .then(jugador => res.status(201).send(jugador))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Jugador
      .findAll({
        include: [
          {model: Avatar,}
        ],
      })
      .then(jugador => res.status(200).send(jugador))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Jugador
      .findById(req.params.jugadorId, {
        include: [{
          model: Avatar,
        }],
      })
      .then(jugador => {
        if (!jugador) {
          return res.status(404).send({
            message: 'Jugador No Encontrado',
          });
        }
        return res.status(200).send(jugador);
      })
      .catch(error => res.status(400).send(error));
  },
};