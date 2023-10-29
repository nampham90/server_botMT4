const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.email = condition.email;
}
class SysUserCheckEmailRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        if(req.body.email) {
            const validate = this.Validator(req.body.email);
            if(validate.error) {
                this.error = validate.error.details[0].message;
            } else {
                this.condition = new ConditionDto(req.body);
            }
        } else {
            this.error = "Request không hợp lệ "
        }
       
    }

    Validator = (email) => {
        const rule = Joi.string().required().email();
        return rule.validate(email);
    }


}

module.exports = SysUserCheckEmailRequest;