const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    admin: {type: Boolean, default: 0},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true}
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);