module.exports = (app) => {
  const bio = require("../controllers/bio.controller.js");

  var router = require("express").Router();

  const multer = require("multer");
  const upload = multer({ dest: "images/" });

  // Create a new
  router.post("/", upload.single('avatar'), bio.create);

  // Retrieve all
  router.get("/", bio.findAll);

  // Retrieve a single with id
  router.get("/show", bio.findOne);

  // Update a with id
  router.put("/:id", bio.update);

  // Delete a with id
  router.delete("/:id", bio.delete);

  app.use("/api/bio", router);
};
