const Avatar = require('../models').Avatar;
const Jugador = require('../models').Jugador;
var fs = require('fs');
const cloudinary = require('cloudinary');
const config = require('../config/cloudinary').cloudinary;

/*configure our cloudinary*/
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
});
//cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
module.exports = {
  create(req, res) {
    return Avatar
      .create({
        nombre: req.body.nombre,
        url: req.files.url.path,
      })
      .then(avatar => {
        var name = req.files.url.originalFilename.split(".");
        var path = name[0] + "-id" + avatar.dataValues.id;
        var url_cloudinary;

        cloudinary.v2.uploader.upload(req.files.url.path, {
            public_id: path,
            tags: ['avatar', 'proyecto-final']
          },
          function (error, result) {
            url_cloudinary = result.url;
            console.log(url_cloudinary);
            console.log(result, error);
            return avatar
              .update({
                nombre: req.body.nombre || avatar.nombre,
                url: url_cloudinary || avatar.url,
              })
              .then(() => res.redirect('back')) // Send back the updated avatar.
              .catch((error) => res.status(400).send(error));
          });

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
        var path = name[0] + "-id" + avatar.dataValues.id;
        var url_cloudinary;

        cloudinary.v2.uploader.upload(req.files.url.path, {
            public_id: path,
            tags: ['avatar', 'proyecto-final']
          },
          function (error, result) {
            url_cloudinary = result.url;
            console.log(url_cloudinary);
            console.log(result, error);
            return avatar
              .update({
                nombre: req.body.nombre || avatar.nombre,
                url: url_cloudinary || avatar.url,
              })
              .then(() => res.redirect('back')) // Send back the updated avatar.
              .catch((error) => res.status(400).send(error));
          });
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