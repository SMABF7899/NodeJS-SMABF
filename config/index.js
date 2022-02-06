const DATABASE = require('./database');
const SESSION = require('./session');
const LAYOUT = require('./layout');
const SERVICE = require('./service');

module.exports = {
    DATABASE,
    SESSION,
    LAYOUT,
    SERVICE,
    PORT : process.env.APPLICATION_PORT
}