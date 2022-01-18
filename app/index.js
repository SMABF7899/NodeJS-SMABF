const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const config = require('./config')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')
const {request} = require("express");

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
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.set('views', path.resolve('./resource/views'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true}));
        app.use(validator());
        app.use(session({
            secret : 'mySecretKey',
            resave : true,
            saveUninitialized : true,
            store : new MongoStore({ mongooseConnection : mongoose.connection })
        }));
        app.use(cookieParser('mySecretKey'));
        app.use(flash());
    }

    setMongoConnection () {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://" + config.IP_DB + ":27017/nodejs_smabf").then(r => console.log("Connect to MongoDB " + config.IP_DB + ":27017"));
    }

    setRouters () {
        //app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));
    }
}