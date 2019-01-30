const Avatar = require('../models').Avatar;
const Jugador = require('../models').Jugador;

module.exports = {
  create(req, res) {
    return Avatar
      .create({
        nombre: req.body.nombre,
        url: req.body.url,
      })
      .then(avatar => res.status(201).send(avatar))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Avatar
      .findAll({
        include: [{
          model: Jugador,
          as: 'jugadores',
        }],
      })
      .then(avatars => res.status(200).send(avatars))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Avatar
      .findById(req.params.avatarId, {
        include: [{
          model: Jugador,
          as: 'jugadores',
        }],
      })
      .then(avatar => {
        if (!avatar) {
          return res.status(404).send({
            message: 'Avatar No Encontrado',
          });
        }
        return res.status(200).send(avatar);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Avatar
      .findById(req.params.avatarId, {
        include: [{
          model: Jugador,
          as: 'jugadores',
        }],
      })
      .then(avatar => {
        if (!avatar) {
          return res.status(404).send({
            message: 'Avatar No Encontrado',
          });
        }
        return avatar
          .update({
            nombre: req.body.nombre || todo.nombre,
            url: req.body.url || todo.url,
          })
          .then(() => res.status(200).send(avatar))  // Send back the updated avatar.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};