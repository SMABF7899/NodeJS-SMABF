const validator = require('./validator');
const {check} = require('express-validator/check')

class registerValidator extends validator {
    handle() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage("قسمت نام نمی‌تواند خالی باشد"),

            check('email')
                .isEmail()
                .withMessage("ایمیل باید معتبر باشد"),

            check('password')
                .not().isEmpty()
                .withMessage("قسمت رمز عبور نمی‌تواند خالی باشد")
                .isLength({min: 8})
                .withMessage("قسمت رمز عبور نمی‌تواند کمتر از ۸ کاراکاتر باشد")
        ]
    }
}

module.exports = new registerValidator();