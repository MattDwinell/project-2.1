var User = require("../models/users.js");

module.exports = function(app) {
    app.get("/api/users", function(request, response) {
        User.findAll({}).then(function(results) {
            response.json(results);
        });
    });

    app.post("/api/scores", function(request, response) {
       let {userName, time} = request.body;
        User.create({
            username: userName,
            userTimes: time
        });
    });
};