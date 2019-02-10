const Carta = require('../models').Carta;
let formidable = require('formidable');
const cloudinary = require('cloudinary');
const config = require('../config/cloudinary').cloudinary;

/*configure our cloudinary*/
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
});

module.exports = {
  create(req, res) {
    //form.uploadDir = "images/";
    //form.keepExtensions = true;
    //form.maxFieldsSize = 10 * 1024 * 1024; //10MB
    //form.multiples = true;
    return Carta
      .create({
        nombre: req.body.nombre,
        url: req.files.url.path,
        score: req.body.score
      })
      .then(carta => {
        var name = req.files.url.originalFilename.split(".");
        var path = name[0] + "-id" + carta.dataValues.id;
        var url_cloudinary;

        cloudinary.v2.uploader.upload(req.files.url.path, {
            public_id: path,
            tags: ['carta', 'proyecto-final']
          },
          function (error, result) {
            url_cloudinary = result.url;
            console.log(url_cloudinary);
            console.log(result, error);
            return carta
              .update({
                nombre: req.body.nombre || carta.nombre,
                url: url_cloudinary || carta.url,
                score: carta.score,
              })
              .then(() => res.redirect('back')) // Send back the updated carta.
              .catch((error) => res.status(400).send(error));
          });
      })
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
        var name = req.files.url.originalFilename.split(".");
        var path = name[0] + "-id" + carta.dataValues.id;
        var url_cloudinary;

        cloudinary.v2.uploader.upload(req.files.url.path, {
            public_id: path,
            tags: ['carta', 'proyecto-final']
          },
          function (error, result) {
            url_cloudinary = result.url;
            console.log(url_cloudinary);
            console.log(result, error);
            return carta
              .update({
                nombre: req.body.nombre || carta.nombre,
                url: url_cloudinary || carta.url,
                score: carta.score,
              })
              .then(() => res.redirect('back')) // Send back the updated carta.
              .catch((error) => res.status(400).send(error));
          });
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Carta
      .findById(req.params.cartaId)
      .then(carta => {
        if (!carta) {
          return res.status(400).send({
            message: 'Carta No Encontrada',
          });
        }
        return carta
          .destroy()
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};