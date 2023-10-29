const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.id = condition.id;
    this.name = condition.name;
    this.available = condition.available;
    this.sex = condition.sex;
    this.email = condition.email;
    this.dienthoai = condition.dienthoai;
    this.roles = condition.role_id;
    this.phongban_id = condition.phongban_id;
}
class SysUserUpdateRequest extends AbstractRequest {
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
            name: Joi.string().min(6).max(20).required(),
            available: Joi.boolean().required(),
            sex: Joi.number().integer().required(),
            dienthoai: Joi.string().max(12).pattern(new RegExp('^[0-9]{10}$')).required(),
            email: Joi.string().required().email(),
            phongban_id: Joi.number().integer().required(),
            role_id: Joi.array().items(Joi.number())
        });
        return rule.validate(condition);
    }


}

module.exports = SysUserUpdateRequest;