const db = require("../models");

const sharp = require("sharp");

const fs = require("fs");
const path = require("path");
const dirName = path.dirname(path.join(__dirname, '../../') ?? 'https://expressjssql.vercel.app/');

const Bio = db.bio;
const Op = db.modSequelize.Op;

exports.create = (req, res) => {
  fs.rename(req.file.path, "./images/" + req.file.originalname, (err) => {
    console.log(err);
  });

  sharp(dirName + "/images/" + req.file.originalname)
    .resize(500, 500)
    .toFile(dirName + "/images/500-" + req.file.originalname);
  sharp(dirName + "/images/" + req.file.originalname)
    .resize(1000, 1000)
    .toFile(dirName + "/images/1000-" + req.file.originalname);

  const avatar = {
    first: "/images/500-" + req.file.originalname,
    second: "/images/1000-" + req.file.originalname
  };

  const payload = {
    url_endpoint: req.body.url_endpoint,
    name: req.body.name,
    birthday: req.body.birthday,
    age: req.body.age,
    phone: req.body.phone,
    city: req.body.city,
    last_education: req.body.last_education,
    avatar: JSON.stringify(avatar),
  };

  Bio.create(payload)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating.",
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const url_endpoint = req.query.url_endpoint;
  var condition = url_endpoint
    ? {
        url_endpoint: { [Op.like]: `%${url_endpoint}%` },
      }
    : null;

  Bio.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

// Find a single with an id
exports.findOne = (req, res) => {
  const url_endpoint = req.query.url_endpoint;
  var condition = url_endpoint
    ? {
        url_endpoint: { [Op.like]: `%${url_endpoint}%` },
      }
    : null;

  Bio.findAll({ where: condition })
    .then((data) => {
      if (data) {
        var newAvatar = data[0].avatar;
        newAvatar = JSON.parse(newAvatar)

        data[0].avatar = newAvatar
        
        res.send(data[0]);
      } else {
        res.status(404).send({
          message: `Cannot find data with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id,
      });
    });
};

// Update a by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const payload = {
    url_endpoint: req.body.url_endpoint,
    name: req.body.name,
    birthday: req.body.birthday,
    age: req.body.age,
    phone: req.body.phone,
    city: req.body.city,
    last_education: req.body.last_education,
    avatar: "kosong updated",
    // avatar: req.body.avatar,
  };

  Bio.update(payload, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "data was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating data with id=" + id,
      });
    });
};

// Delete a with the specified id in the request
exports.delete = (req, res) => {};
