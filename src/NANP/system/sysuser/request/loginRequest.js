const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(email, password) {
    this.email = email;
    this.password = password;
}
class LoginRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.loginValidator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.body.email, req.body.password);
        }
    }

    loginValidator = (data) => {
        const rule = Joi.object({
            email: Joi.string().min(6).max(225).required().email(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
        })
        return rule.validate(data);
    }


}

module.exports = LoginRequest;