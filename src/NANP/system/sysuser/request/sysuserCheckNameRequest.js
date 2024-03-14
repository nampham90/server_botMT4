const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.name = condition.name;
}
class SysUserCheckNameRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        if(req.body.name) {
            const validate = this.Validator(req.body.name);
            if(validate.error) {
                this.error = validate.error.details[0].message;
            } else {
                this.condition = new ConditionDto(req.body);
            }
        } else {
            this.error = "Request không hợp lệ "
        }
       
    }

    Validator = (name) => {
        const rule = Joi.string().min(6).max(20).required();
        return rule.validate(name);
    }


}

module.exports = SysUserCheckNameRequest;