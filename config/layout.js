const path = require('path');
const expressLayouts = require('express-ejs-layouts');

module.exports = {
    PUBLIC_DIR : "public",
    VIEW_DIR : path.resolve('./resource/views'),
    VIEW_ENGINE : "ejs",
    EJS : {
        expressLayouts,
        extractScript : true,
        extractStyle : true,
        MASTER : 'home/master'
    }
}