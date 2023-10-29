const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.id = condition.id;
    this.oldPassword = condition.oldPassword;
    this.newPassword = condition.newPassword;
}
class SysUserChangePasswordRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.Validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.body);
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            id: Joi.number().integer().required(),
            oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
            newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
        });
        return rule.validate(condition);
    }


}

module.exports = SysUserChangePasswordRequest;