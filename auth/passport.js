const   db              = require("../DatabaseConnection/mysql"),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local').Strategy,
        JwtStrategy     = require('passport-jwt').Strategy,
        ExtractJwt      = require('passport-jwt').ExtractJwt,
        secret          = require('./jwt_secret_key');
        bcrypt          = require('bcrypt');

const localLogin = new LocalStrategy({usernameField: 'username'},
     function(username, password, done) {
         console.log("passport got here");
         db.query("SELECT * FROM user WHERE username = ?", username, function (err, user) {
             if (err) { return done(err); }
             if (!user.length) {
                 return done(null, false, { message: 'Incorrect username.' });
             }

             bcrypt.compare(password, user[0].password, function(err, isMatch) {
                 if (err) { return done(err); }
                 if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

                 return done(null, user[0]);
             });

             console.log(user[0].id);
         })
     });

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: secret.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    console.log("Payload: " + payload);
    db.query("SELECT * FROM user WHERE id = ?", payload.id, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);