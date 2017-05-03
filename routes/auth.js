const   AuthController  = require('../controllers/authentication'),
        express         = require('express'),
        passportService = require('../auth/passport'),
        passport        = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    const apiRoutes = express.Router();
    const authRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/login', requireLogin, AuthController.login);

    app.use('/api', apiRoutes);
};