const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
     this.rolename = condition.filters.rolename || undefined
}
class SysRoleFindAllRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        this.condition = null
        if(req.body.filters) {
            const validate = this.Validator(req.body.filters);
            if(validate.error) {
                this.error = validate.error.details[0].message;
            } else {
                this.condition = new ConditionDto(req.body);
            }
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            rolename: Joi.allow()
        });
        return rule.validate(condition);
    }


}

module.exports = SysRoleFindAllRequest;