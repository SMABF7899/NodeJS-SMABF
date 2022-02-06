const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);

module.exports = {
    secret : process.env.SESSION_SECRET_KEY,
    resave : true,
    saveUninitialized : true,
    cookie : {expires : new Date(Date.now() + 1000 * 60 * 60 * 24)},
    store : new MongoStore({ mongooseConnection : mongoose.connection })
}