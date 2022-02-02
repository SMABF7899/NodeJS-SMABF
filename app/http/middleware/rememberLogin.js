const User = require('app/models/user');
const middleware = require('./middleware');

class rememberLogin extends middleware {
    handle(req, res, next) {
        if (!req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_token;
            if (rememberToken) return this.userFind(rememberToken, next, req);
        }
        next();
    }

    userFind(rememberToken, next, req) {
        User.findOne({rememberToken})
            .then(user => {
                if (user) {
                    req.login(user, err => {
                        if(err) next(err);
                        next();
                    })
                } else next();
            })
            .catch(err => next(err));
    }
}

module.exports = new rememberLogin();