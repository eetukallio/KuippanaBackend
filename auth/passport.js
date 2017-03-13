const db = require("../DatabaseConnection/mysql");
const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
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

         })
     });