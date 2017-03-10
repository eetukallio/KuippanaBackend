/**
 * Created by eetukallio on 8.3.2017.
 */

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require("express-session");

const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const db = require("./DatabaseConnection/mysql");
const jsonParser = bodyParser.json();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");


passport.use(new LocalStrategy(
    function(username, password, done) {

    console.log("passport got here");
    db.query("SELECT * FROM user WHERE username = ?", username, function (err, user) {

        if (err) { return done(err); }

        if (!user.length) {

            return done(null, false, { message: 'Incorrect username.' });
        }

        if (!(user[0].password == password)) {

            return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(user[0].id);
        return done(null, user[0]);

    });
}));

passport.serializeUser(function (user, done) {
    console.log('serializeUser: ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = db.query("SELECT * FROM user WHERE id = ?", id, function(err, user){
        console.log(user);
        if(!err) done(null, user);
        else done(err, null)
    });
    done(user);
});




app.get('/users', userRoutes.getUsers);

app.get('/users/:id', userRoutes.getUsersById);

app.post("/register", jsonParser, userRoutes.register);

app.post("/login", passport.authenticate('local') , authRoutes.login);



app.listen(3000);

