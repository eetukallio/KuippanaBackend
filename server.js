/**
 * Created by eetukallio on 8.3.2017.
 */

const express             = require('express');
const bodyParser          = require('body-parser');
const cookieParser        = require('cookie-parser');
const passport            = require('passport');
const jsonParser          = bodyParser.json();
const app                 = express();
const cors                = require("cors");
const logger              = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonParser);
app.use(cookieParser());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});

const authRouter          = require('./routes/auth');
const userRoutes          = require("./routes/users");
const qualityRoutes       = require("./routes/qualities");
const clientRoutes        = require("./routes/clients");
const orderRoutes         = require("./routes/workOrders");

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

console.log("Server running at port 3000");
app.listen(3000);

authRouter(app);

