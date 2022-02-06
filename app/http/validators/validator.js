const authBind = require('auto-bind');

module.exports = class Request {
    constructor() {
        authBind(this);
    }
}