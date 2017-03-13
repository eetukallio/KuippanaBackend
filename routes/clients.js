const db = require("../DatabaseConnection/mysql");

module.exports.getClients = function (req, res) {
    db.query('SELECT * FROM client', function (err, result) {

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

module.exports.getClientsById = function (req, res) {
    db.query('SELECT * FROM client WHERE id=?', req.params.id, function (err, result) {

        if (!err) {
            res.json(result);
        } else {
            res.status(404);
            res.json({
                message: "Client not found."
            });
            console.log(err)
        }
    });
};

module.exports.updateClientById = function (req, res) {
    const data = req.body;
    db.query('UPDATE client SET ? WHERE id=?', [data , req.params.id], function (err, result) {

        if (!err) {
            res.json(result);
        } else {
            res.status(404);
            res.json({
                message: "Client not found."
            });
            console.log(err)
        }
    });
};

module.exports.addClient = function (req, res) {

    if(!req.body) return res.sendStatus(400);
    const data = req.body;
    db.query("INSERT INTO client SET ?", data, function (err, result) {

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

module.exports.deleteClient = function (req, res) {

    if(!req.body) res.sendStatus(400);
    db.query("DELETE FROM client WHERE id =?", req.params.id, function (err, result) {

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