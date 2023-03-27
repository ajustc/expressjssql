const dbConfig = require("../../config/db.js");

const modSequelize = require("sequelize");
const sequelize = new modSequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatosAliases: false,

    define: {
      timestamps: false,
      freezeTableName: true,
    },

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      idle: dbConfig.pool.idle,
      acquire: dbConfig.pool.acquire,
    },
  }
);

const db = {};

db.modSequelize = modSequelize;
db.sequelize = sequelize;

db.bio = require("./bio.model.js")(sequelize, modSequelize);

module.exports = db;
