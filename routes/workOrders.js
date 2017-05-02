const db = require("../DatabaseConnection/mysql");

module.exports.getWorkOrders = function (req, res) {
    db.query('SELECT CONCAT(user.firstName, \' \', user.lastName) As fullName, client.name AS clientName, duration, quality.name as quality, user.id AS userId, date, additionalInfo ' +
    'FROM workOrder ' +
    'INNER JOIN user ON workOrder.user = user.id ' +
    'INNER JOIN client ON workOrder.client = client.id ' +
    'INNER JOIN quality ON workOrder.quality = quality.id', function (err, result) {

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

module.exports.getWorkOrderById = function (req, res) {
    db.query('SELECT * FROM workOrder WHERE id=?', req.params.id, function (err, result) {

        if (!err) {

            res.json(result);
        } else {

            res.status(404);
            res.json({
                message: "Work order not found."
            });
            console.log(err)
        }
    });
};

module.exports.updateWorkOrdersById = function (req, res) {
    const data = req.body;
    db.query('UPDATE workOrder SET ? WHERE id=?', [data , req.params.id], function (err, result) {

        if (!err) {
            res.json(result);
        } else {
            res.status(404);
            res.json({
                message: "Work order not found."
            });
            console.log(err)
        }
    });
};

module.exports.addWorkOrder = function (req, res) {

    if(!req.body) return res.sendStatus(400);
    const data = req.body;
    db.query("INSERT INTO workOrder SET ?", data, function (err, result) {

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

module.exports.deleteWorkOrder = function (req, res) {

    if(!req.body) res.sendStatus(400);
    db.query("DELETE FROM workOrder WHERE id =?", req.params.id, function (err, result) {

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
