var User = require("../models/users.js");

module.exports = function(app) {
    app.get("/api/users", function(request, response) {
        User.findAll({}).then(function(results) {
            response.json(results);
        });
    });

    app.post("/api/scores", function(request, response) {
        var user = request.body;
        User.create({
            username: user.name,
            time: user.time
        });
    });
};