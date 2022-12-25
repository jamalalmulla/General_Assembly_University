const passport = require('passport');
const User = require('../models/User');

const LocalStrategy = require("passport-local").Strategy;

// Serialize Function
//saving thr data into session
// id is a unique
passport.serializeUser(function (user, done) {
    done(null, user.id);

})

// Deserialize function
//reading the information from the database according to the user id from the session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"

},
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {console.log("user doesn't exist"); return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));




// Exports
module.exports = passport;
