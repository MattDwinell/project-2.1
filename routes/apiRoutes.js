var User = require("../models/users.js");
var sequelize = require("sequelize");

module.exports = function(app) {
    app.get("/api/scores", function(request, response) {
        User.findAll({
            order: sequelize.literal("userTimes ASC")
        }).then(function(results) {
            response.json(results);
        });
    });

    app.post("/api/scores", function(request, response) {
       let {userName, time} = request.body;
        User.create({
            username: userName,
            userTimes: time,
            order: sequelize.literal("userTimes ASC")
        });
    });
};