const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('app/models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    console.log(email, password)
    User.findById({'email': email}, (err, user) => {
        console.log(err, user)
    })
}))