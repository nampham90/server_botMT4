const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
     this.pageNum = condition.pageNum;
     this.pageSize = condition.pageSize;
     this.phongban_id = condition.filters.phongban_id || undefined
}
class SysUserFindAllRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.Validator(req.body.filters);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.body);
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            phongban_id: Joi.allow()
        });
        return rule.validate(condition);
    }


}

module.exports = SysUserFindAllRequest;