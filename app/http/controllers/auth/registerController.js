const controller = require('app/http/controllers/controller');
const passport = require('passport');
const config = require('app/config')

class registerController extends controller {
    showRegisterForm(req, res) {
        res.render('auth/register', {errors: req.flash('errors'), recaptcha: this.recaptcha.render()});
    }

    registerProcess(req, res, next) {
        this.recaptchaValidation(req, res)
            .then(result => this.validationData(req))
            .then(result => {
                if (result) this.register(req, res, next)
                else res.redirect('/register');
            })
            .catch(err => console.log(err));
    }

    validationData(req) {
        req.checkBody('name', 'قسمت نام نمی‌تواند خالی باشد').notEmpty();
        req.checkBody('email', 'قسمت ایمیل نمی‌تواند خالی باشد').notEmpty();
        req.checkBody('email', 'ایمیل باید معتبر باشد').isEmail();
        req.checkBody('password', 'قسمت رمز عبور نمی‌تواند خالی باشد').notEmpty();
        req.checkBody('password', 'قسمت رمز عبور نمی‌تواند کمتر از ۸ کاراکاتر باشد').isLength({min: 8});

        return req.getValidationResult()
            .then(result => {
                const errors = result.array();
                const massage = [];
                errors.forEach(err => massage.push(err.msg))
                if (massage.length === 0)
                    return true;
                req.flash('errors', massage)
                return false;
            })
            .catch(err => console.log(err));
    }

    register(req, res, next) {
        passport.authenticate('local.register', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash: true
        })(req, res, next);
    }
}

module.exports = new registerController();