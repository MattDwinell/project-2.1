var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var User = sequelize.define("user", {
    username: Sequelize.STRING,
    userTimes: Sequelize.TIME
});

User.sync();

module.exports = User;