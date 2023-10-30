const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function DataUpdate(condition) {
    this.rolename = condition.rolename;
    this.mota = condition.mota;
}
function ConditionDto(condition) {
    this.id = condition.id;
    this.lang = "vi";

}
class SysRoleUpdateRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.Validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.body);
            this.condition.lang = this.lang;
            this.dataUpdate = new DataUpdate(req.body);
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            id: Joi.number().integer().required(),
            rolename: Joi.string().max(50).required(),
            mota: Joi.string().max(100).required(),
        });
        return rule.validate(condition);
    }


}

module.exports = SysRoleUpdateRequest;