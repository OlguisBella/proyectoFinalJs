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
  list(req, res) {
    return Carta
      .findAll()
      .then(carta => res.status(200).send(carta))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Carta
      .findById(req.params.cartaId)
      .then(carta => {
        if (!carta) {
          return res.status(404).send({
            message: 'Carta No Encontrada',
          });
        }
        return res.status(200).send(carta);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Carta
      .findById(req.params.cartaId)
      .then(carta => {
        if (!carta) {
          return res.status(404).send({
            message: 'Carta No Encontrada',
          });
        }
        return carta
          .update({
            nombre: req.body.nombre || carta.nombre,
            url: req.body.url || carta.url,
          })
          .then(() => res.status(200).send(carta))  // Send back the updated carta.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};