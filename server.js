/**
 * Created by eetukallio on 8.3.2017.
 */

var express = require('express');

var app = express();

var db = require("./DatabaseConnection/mysql");





app.get('/users', function (req, res) {
    db.query('SELECT * FROM user WHERE id=1', function (err, result) {
        // Neat!
        if (!err) {
            console.log(result);
        } else {
            console.log(err)
        }
    });
});

app.get('/users/:id', function (req, res) {
    db.query('SELECT * FROM user WHERE id=?', req.params.id, function (err, result) {
        // Neat!
        if (!err) {
            res.json(result);
        } else {
            console.log(err)
        }
    });
});



app.listen(3000);

