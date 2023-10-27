const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
     this.tenphongban = condition.filters.tenphongban || undefined
}
class SysDepartmentFindAllRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        this.condition = null;
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
            tenphongban: Joi.allow()
        });
        return rule.validate(condition);
    }


}

module.exports = SysDepartmentFindAllRequest;