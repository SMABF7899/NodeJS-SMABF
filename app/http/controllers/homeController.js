const controller = require('app/http/controllers/controller')

class homeController extends controller {
    index(req , res) {
        res.json(req.user);
    }
}

module.exports = new homeController();