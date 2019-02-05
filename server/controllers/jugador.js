const Jugador = require('../models').Jugador;
const Avatar = require('../models').Avatar;
const sequelize = require('sequelize');

module.exports = {
  create(req, res) {
    console.log(req.body)
    return Jugador
      .create({
        puntaje: req.body.puntaje,
        avatarId: req.body.avatarId,
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
  update(req, res) {
    return Jugador
      .findById(req.params.jugadorId)
      .then(jugador => {
        if (!jugador) {
          return res.status(404).send({
            message: 'Jugador No Encontrado',
          });
        }
  
        return jugador
          .update({
            puntaje: req.body.puntaje || jugador.puntaje,
          })
          .then(updatedJugador => res.status(200).send(updatedJugador))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Jugador
      .findById(req.params.jugadorId)
      .then(jugador => {
        if (!jugador) {
          return res.status(404).send({
            message: 'Jugador No Encontrado',
          });
        }
  
        return jugador
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  listTop(req, res) {
    return Jugador
      .findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['puntaje', 'DESC'],
          // Will order by max(age) DESC
          //[sequelize.fn('max', sequelize.col('puntaje')), 'DESC'],
        ],
        limit: 10,
        //order: sequelize.literal('max(puntaje) DESC'),
        include: [
          {model: Avatar,}
        ],
      })
      .then(jugador => res.status(200).send(jugador))
      .catch(error => res.status(400).send(error));
  },
};