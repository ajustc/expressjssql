module.exports = {
  HOST: "dblokal",
  USER: "online" /* MySQL User */,
  PASSWORD: "1234qwer1234" /* MySQL Password */,
  DB: "test_node_mobilkudotcom" /* MySQL Database */,
  dialect: "mysql",
  pool: {
    max: 5, // maximum number of connection in pool
    min: 0, // minimum number of connection in pool
    idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
  },
};
