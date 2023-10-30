const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.lang = "vi";
    this.rolename = condition.rolename;
    this.mota = condition.mota;

}
class SysRoleCreateRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.Validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.dataCreate = new ConditionDto(req.body);
            this.dataCreate.lang = this.lang;
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            rolename: Joi.string().max(50).required(),
            mota: Joi.string().max(100).required(),
        });
        return rule.validate(condition);
    }
}

module.exports = SysRoleCreateRequest;