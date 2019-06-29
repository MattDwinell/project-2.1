var Sequelize = require("sequelize");

var sequelize = new Sequelize("maze_db", "root", "RCJh2014!", {
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