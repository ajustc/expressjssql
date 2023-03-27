const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const serverless = require("serverless-http");
const router = express.Router();

const PORT = process.env.PORT || 5000;

var corsOptions = {
  origin: `http://localhost:${PORT}`,
};
app.use(cors(corsOptions));

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(express.static("public"));

/*------------------------------------------
Simple route
--------------------------------------------*/
app.get("/", (req, res) => {
  res.json({ message: "Built with node." });
});
app.use("/images", express.static(path.join(__dirname, "images")));

/*------------------------------------------
All route
--------------------------------------------*/
const bio = require("./app/routes/bio.route")(app);

/*------------------------------------------
Server listening
--------------------------------------------*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
