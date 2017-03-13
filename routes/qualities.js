const db = require("../DatabaseConnection/mysql");

module.exports.getQualities = function (req, res) {
    db.query('SELECT * FROM quality', function (err, result) {

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

module.exports.getQualitiesById = function (req, res) {
    db.query('SELECT * FROM quality WHERE id=?', req.params.id, function (err, result) {

        if (!err) {
            res.json(result);
        } else {
            res.status(404);
            res.json({
                message: "Quality not found."
            });
            console.log(err)
        }
    });
};

module.exports.updateQualityById = function (req, res) {
    const data = req.body;
    db.query('UPDATE quality SET ? WHERE id=?', [data , req.params.id], function (err, result) {

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

module.exports.addQuality = function (req, res) {

    if(!req.body) return res.sendStatus(400);
    const data = req.body;
    db.query("INSERT INTO quality SET ?", data, function (err, result) {

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

module.exports.deleteQuality = function (req, res) {

    if(!req.body) res.sendStatus(400);
    db.query("DELETE FROM quality WHERE id =?", req.params.id, function (err, result) {

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