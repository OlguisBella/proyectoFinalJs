const Avatar = require('../models').Avatar;
const Jugador = require('../models').Jugador;
var fs = require('fs');

module.exports = {
  create(req, res) {
    return Avatar
      .create({
        nombre: req.body.nombre,
        url: req.files.url.path,
      })
      .then(avatar => {
        var name = req.files.url.originalFilename.split(".");
        var path = "server/public/images/AVATAR/" + name[0] + "-id" + avatar.dataValues.id + "." + name[1];
        fs.rename(req.files.url.path, path);
        path = path.split("public/")[1];
        path = "./" + path;
        console.log(path);
        //return res.status(201).send(carta);
        return avatar
          .update({
            nombre: req.body.nombre || avatar.nombre,
            url: path || avatar.url,
          })
          .then(() => res.redirect('back')) // Send back the updated avatar.
          .catch((error) => res.status(400).send(error));
      })
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
        var name = req.files.url.originalFilename.split(".");
        var path = "server/public/images/AVATAR/" + name[0] + "-id" + avatar.dataValues.id + "." + name[1];
        fs.rename(req.files.url.path, path);
        path = path.split("public/")[1];
        path = "./" + path;
        console.log(path);
        //return res.status(201).send(carta);
        return avatar
          .update({
            nombre: req.body.nombre || avatar.nombre,
            url: path || avatar.url,
          })
          .then(() => res.redirect('back')) // Send back the updated avatar.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Avatar
      .findById(req.params.avatarId)
      .then(avatar => {
        if (!avatar) {
          return res.status(400).send({
            message: 'Avatar No Encontrado',
          });
        }
        return avatar
          .destroy()
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};