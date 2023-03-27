module.exports = (sequelize, modSequelize) => {
  const Bio = sequelize.define(
    "bio",
    {
      url_endpoint: {
        type: modSequelize.STRING,
        unique: true
      },
      name: {
        type: modSequelize.STRING,
      },
      birthday: {
        type: modSequelize.DATE,
      },
      age: {
        type: modSequelize.INTEGER,
      },
      phone: {
        type: modSequelize.CHAR(50),
      },
      city: {
        type: modSequelize.STRING,
      },
      last_education: {
        type: modSequelize.STRING,
      },
      avatar: {
        type: modSequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return Bio;
};
