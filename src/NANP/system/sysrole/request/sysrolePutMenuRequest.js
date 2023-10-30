const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');

function ConditionDto(condition) {
    this.roleId = condition.roleId;
    this.permissionIds = condition.permissionIds;
}
class SysRolePutMenuRequest extends AbstractRequest {
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
            roleId: Joi.number().integer().required(),
            permissionIds: Joi.array().items(Joi.string()),
        });
        return rule.validate(condition);
    }


}
module.exports = SysRolePutMenuRequest;