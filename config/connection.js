var Sequelize = require("sequelize");

var sequelize = new Sequelize("maze_db", "root", "25064c001023818v", {
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