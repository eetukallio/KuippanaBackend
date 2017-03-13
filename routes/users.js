/**
 * Created by eetukallio on 8.3.2017.
 */

const db = require("../DatabaseConnection/mysql");

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

module.exports.updateUsersById = function (req, res) {
    const data = req.body;
    db.query('UPDATE user SET ? WHERE id=?', [data , req.params.id], function (err, result) {

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
    const data = req.body;
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

module.exports.deleteUser = function (req, res) {

    if(!req.body) res.sendStatus(400);
    db.query("DELETE FROM user WHERE id =?", req.params.id, function (err, result) {

        if (!err) {
            res.status(200);
            res.json(result);
        } else {
            console.log(err);
            res.status(404);
            res.json({
                message: "not found"
            })
        }
    })
};
