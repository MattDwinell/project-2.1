var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/./config.json")[env];

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
    var sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

/*var sequelize = new Sequelize(process.env[config.use_env_variable] || "maze_db", "root", "RCJh2014!", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});*/

module.exports = sequelize;