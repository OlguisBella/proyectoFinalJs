const Avatar = require('../models').Avatar;

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
};