const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.name = condition.name;
    this.password = condition.password;
    this.available = condition.available;
    this.sex = condition.sex;
    this.email = condition.email;
    this.dienthoai = condition.dienthoai;
    this.roles = condition.role_id;
    this.phongban_id = condition.phongban_id;
    this.taxcd = condition.taxcd;
    this.area = condition.area;
    this.desc = condition.desc;
    this.city = condition.city;
    this.province = condition.province;
    this.street = condition.street;
}
class SysUserCreateRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.Validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.body);
            this.condition.cmpnyCd= this.cmpnyCd
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            name: Joi.string().min(6).max(20).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
            available: Joi.boolean(),
            sex: Joi.number().integer(),
            dienthoai: Joi.string().max(12),
            email: Joi.string().email().allow(null, ''),
            phongban_id: Joi.number().integer().required(),
            role_id: Joi.array().items(Joi.number()),
            taxcd: Joi.string().allow(null, ''),
            area: Joi.string().allow(null, ''),
            desc: Joi.string().allow(null, ''),
            city: Joi.number().allow(null, ''),
            mobile: Joi.string().allow(null, ''),
            province: Joi.number().allow(null, ''),
            street: Joi.string().allow(null, ''),
        });
        return rule.validate(condition);
    }


}

module.exports = SysUserCreateRequest;