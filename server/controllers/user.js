const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        nombre: req.body.nombre,
        username: req.body.username,
        pass: req.body.pass,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
};