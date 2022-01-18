const controller = require('app/http/controllers/controller')

class indexController extends controller{
    index(req , res) {
        res.json('Admin Page')
    }
}

module.exports = new indexController();