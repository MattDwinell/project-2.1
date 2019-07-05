var Sequelize = require("sequelize");

var sequelize = new Sequelize(process.env.JAWSDB_URL || "maze_db", "root", "RCJh2014!", {
    host: "edo4plet5mhv93s3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;