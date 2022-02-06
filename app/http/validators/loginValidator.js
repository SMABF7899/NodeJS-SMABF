const validator = require('./validator');
const {check} = require('express-validator/check')

class loginValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage("ایمیل باید معتبر باشد"),

            check('password')
                .isLength({min: 8})
                .withMessage("قسمت رمز عبور نمی‌تواند کمتر از ۸ کاراکاتر باشد")
        ]
    }
}

module.exports = new loginValidator();