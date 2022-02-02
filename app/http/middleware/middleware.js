const authBind = require('auto-bind');

module.exports = class Middleware {
    constructor() {
        authBind(this);
    }
}