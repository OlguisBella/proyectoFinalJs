const Carta = require('../models').Carta;

module.exports = {
  create(req, res) {
    return Carta
      .create({
        nombre: req.body.nombre,
        url: req.body.url,
      })
      .then(carta => res.status(201).send(carta))
      .catch(error => res.status(400).send(error));
  },
};