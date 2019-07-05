var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];

var sequelize = new Sequelize(process.env[config.use_env_variable] || "maze_db", "root", "RCJh2014!", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;