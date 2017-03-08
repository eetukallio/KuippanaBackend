/**
 * Created by eetukallio on 8.3.2017.
 */

var db = require("../DatabaseConnection/mysql");

module.exports.getUsers = function (req, res) {
    db.query('SELECT * FROM user WHERE id=1', function (err, result) {

        if (!err) {

            res.json(result);
        } else {
            res.status(500);
            res.json({
                message: "Something went terribly wrong!"
            });
            console.log(err)
        }
    });
};

module.exports.getUsersById = function (req, res) {
    db.query('SELECT * FROM user WHERE id=?', req.params.id, function (err, result) {

        if (!err) {
            res.json(result);
        } else {
            res.status(404);
            res.json({
                message: "User not found."
            });
            console.log(err)
        }
    });
};

module.exports.register = function (req, res) {

    if(!req.body) return res.sendStatus(400);
    var data = req.body;
    db.query("INSERT INTO user SET ?", data, function (err, result) {

        if (!err) {
            res.status(201);
            res.json(result);
        } else {
            console.log(err);
            res.status(500);
            res.json({
                message: "Something went terribly wrong!"
            });
        }
    })
};

