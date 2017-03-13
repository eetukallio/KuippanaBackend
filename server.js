/**
 * Created by eetukallio on 8.3.2017.
 */

const mysql               = require('mysql');
const express             = require('express');
const bodyParser          = require('body-parser');
const cookieParser        = require('cookie-parser');
const expressSession      = require("express-session");
const passport            = require('passport'), LocalStrategy = require('passport-local').Strategy;
const db                  = require("./DatabaseConnection/mysql");
const jsonParser          = bodyParser.json();
const app                 = express();
const localStrategy       = require("./auth/passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 36000 }
}));
app.use(passport.initialize());
app.use(passport.session());

const userRoutes          = require("./routes/users");
const authRoutes          = require("./routes/auth");
const qualityRoutes       = require("./routes/qualities");
const clientRoutes        = require("./routes/clients");
const orderRoutes         = require("./routes/workOrders");

passport.use(localStrategy);

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

//API-route for initial login authentication
app.post("/login", passport.authenticate('local') , authRoutes.login);


//API-routes for USER related queries
app.get('/users', userRoutes.getUsers);
app.get('/users/:id', userRoutes.getUsersById);
app.post("/register", jsonParser, userRoutes.register);
app.delete("/users/:id", userRoutes.deleteUser);
app.put("/users/:id", jsonParser, userRoutes.updateUsersById);

//API-routes for CLIENT related queries
app.get('/clients', clientRoutes.getClients);
app.get('/clients/:id', clientRoutes.getClientsById);
app.post("/clients", jsonParser, clientRoutes.addClient);
app.delete("/clients/:id", clientRoutes.deleteClient);
app.put("/clients/:id", jsonParser, clientRoutes.updateClientById);

//API-routes for WORK ORDER related queries
app.get('/workorders', orderRoutes.getWorkOrders);
app.get('/workorders/:id', orderRoutes.getWorkOrderById);
app.post("/workorders", jsonParser, orderRoutes.addWorkOrder);
app.delete("/workorders/:id", orderRoutes.deleteWorkOrder);
app.put("/workorders/:id", jsonParser, orderRoutes.updateWorkOrdersById);

//API-routes for QUALITY related queries
app.get('/qualities', qualityRoutes.getQualities);
app.get('/qualities/:id', qualityRoutes.getQualitiesById);
app.post("/qualities", jsonParser, qualityRoutes.addQuality);
app.delete("/qualities/:id", qualityRoutes.deleteQuality);
app.put("/qualities/:id", jsonParser, qualityRoutes.updateQualityById);

console.log("Server running");
app.listen(3000);

