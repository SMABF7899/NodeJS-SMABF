const controller = require('app/http/controllers/controller');
const passport = require('passport');

class loginController extends controller {
    showLoginForm(req , res) {
        res.render('auth/login', {errors: req.flash('errors'), recaptcha: this.recaptcha.render()});
    }

    loginProcess(req, res, next) {
        this.recaptchaValidation(req, res)
            .then(result => this.validationData(req))
            .then(result => {
                if (result) this.login(req, res, next)
                else res.redirect('/login')
            })
            .catch(err => console.log(err))
    }

    validationData(req) {
        req.checkBody('email', 'ایمیل باید معتبر باشد').isEmail();
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

    login(req, res, next) {
        passport.authenticate('local.login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }
}

module.exports = new loginController();