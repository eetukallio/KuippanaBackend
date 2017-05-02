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

authRouter(app);

const requireAuth = passport.authenticate('jwt', {session: false});

//API-routes for USER related queries
app.get('/users', requireAuth, userRoutes.getUsers);
app.get('/users/:id', requireAuth, userRoutes.getUsersById);
app.post("/register", requireAuth, jsonParser, userRoutes.register);
app.delete("/users/:id", requireAuth, userRoutes.deleteUser);
app.put("/users/:id", requireAuth, jsonParser, userRoutes.updateUsersById);

//API-routes for CLIENT related queries
app.get('/clients', requireAuth, clientRoutes.getClients);
app.get('/clients/:id', requireAuth, clientRoutes.getClientsById);
app.post("/clients", requireAuth, jsonParser, clientRoutes.addClient);
app.delete("/clients/:id", requireAuth, clientRoutes.deleteClient);
app.put("/clients/:id", requireAuth, jsonParser, clientRoutes.updateClientById);

//API-routes for WORK ORDER related queries
app.get('/workorders', requireAuth, orderRoutes.getWorkOrders);
app.get('/workorders/:id', requireAuth, orderRoutes.getWorkOrderById);
app.post("/workorders", requireAuth, jsonParser, orderRoutes.addWorkOrder);
app.delete("/workorders/:id", requireAuth, orderRoutes.deleteWorkOrder);
app.put("/workorders/:id", requireAuth, jsonParser, orderRoutes.updateWorkOrdersById);

//API-routes for QUALITY related queries
app.get('/qualities', requireAuth, qualityRoutes.getQualities);
app.get('/qualities/:id', requireAuth, qualityRoutes.getQualitiesById);
app.post("/qualities", requireAuth, jsonParser, qualityRoutes.addQuality);
app.delete("/qualities/:id", requireAuth, qualityRoutes.deleteQuality);
app.put("/qualities/:id", requireAuth, jsonParser, qualityRoutes.updateQualityById);

console.log("Server running at port 3000");
app.listen(8080);




