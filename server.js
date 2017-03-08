/**
 * Created by eetukallio on 8.3.2017.
 */

var express = require('express');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var app = express();



var routes = require("./routes/users");

app.get('/users', routes.getUsers);

app.get('/users/:id', routes.getUsersById);

app.post("/register", jsonParser, routes.register);



app.listen(3000);

