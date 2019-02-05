const Carta = require('../models').Carta;
let formidable = require('formidable');
var fs = require('fs');
var form = new formidable.IncomingForm();

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
        var path = "server/public/images/ANIMALITOS/" + name[0] + "-id" + carta.dataValues.id + "." + name[1];
        fs.rename(req.files.url.path, path);
        path = path.split("public/")[1];
        path = "./" + path;
        console.log(path);
        //return res.status(201).send(carta);
        return carta
          .update({
            nombre: req.body.nombre || carta.nombre,
            url: path || carta.url,
            score: carta.score,
          })
          //.then(() => res.status(201).send(carta)) // Send back the updated carta.
          .then(() => res.redirect('back')) // Send back the updated carta.
          .catch((error) => res.status(400).send(error));
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
        var path = "server/public/images/ANIMALITOS/" + name[0] + "-id" + carta.dataValues.id + "." + name[1];
        fs.rename(req.files.url.path, path);
        path = path.split("public/")[1];
        path = "./" + path;
        console.log(path);
        //return res.status(201).send(carta);
        return carta
          .update({
            nombre: req.body.nombre || carta.nombre,
            url: path || carta.url,
            score: req.body.score || carta.score,
          })
          .then(() => res.redirect('back')) // Send back the updated carta.
          .catch((error) => res.status(400).send(error));
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