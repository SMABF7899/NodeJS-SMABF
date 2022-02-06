const autoBind = require('auto-bind');
const {validationResult} = require("express-validator/check");
const Recaptcha = require('express-recaptcha').Recaptcha;

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(config.SERVICE.RECAPTCHA.SITE_KEY, config.SERVICE.RECAPTCHA.SECRET_KEY, {...config.SERVICE.RECAPTCHA.OPTIONS});
    }

    recaptchaValidation(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if (err) {
                    req.flash('errors', 'گزینه امنیتی مربوط به شناسایی ربات خاموش است. لطفا از فعال بودن آن اطمینان حاصل نمایید و مجدد امتحان کنید')
                    res.redirect(req.url);
                } else resolve(true);
            })
        })
    }

    async validationData(req) {
        const result = validationResult(req);
        if(!result.isEmpty()) {
            const errors = result.array();
            const massage = [];
            errors.forEach(err => massage.push(err.msg))
            req.flash('errors', massage)
            return false;
        }
        return true;
    }
}