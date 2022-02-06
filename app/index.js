const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require("mongoose");
const flash = require('connect-flash')
const passport = require('passport')
const {request} = require("express");
const Helpers = require('./helpers');
const rememberLogin = require('app/http/middleware/rememberLogin');

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection()
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.PORT, () => console.log('Listening on port ' + config.PORT));
    }

    setConfig() {
        //console.log(config.SESSION)
        require('app/passport/passport-local')
        app.use(express.static(config.LAYOUT.PUBLIC_DIR));
        app.set('view engine', config.LAYOUT.VIEW_ENGINE);
        app.set('views', config.LAYOUT.VIEW_DIR);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true}));
        app.use(validator());
        app.use(session({...config.SESSION}));
        app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
        app.use(flash());
        app.use(passport.initialize(undefined));
        app.use(passport.session(undefined));
        app.use(rememberLogin.handle)
        app.use((req, res, next) => {
            app.locals = new Helpers(req, res).getObjects();
            next()
        });
    }

    setMongoConnection () {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://" + config.DATABASE.URL + "/" + config.DATABASE.NAME).then(r => console.log("Connect to MongoDB " + config.DATABASE.URL));
    }

    setRouters () {
        //app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));
    }
}