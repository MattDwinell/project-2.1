var Sequelize = require("sequelize");
var config = require(__dirname + "./config.json")[env];
var db = {};

if (config.use_env_variable) {
    var sequelize = new Sequelize(proces.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;