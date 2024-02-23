const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(phongban_id) {
    this.phongban_id = phongban_id;
}
class SysUserFindByDepartmentIdRequest extends AbstractRequest {
    constructor(req){
        super(req)
        this.error = "";
        this.condition = {}
        const validate = this.Validator(req.body.phongban_id);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.body.phongban_id);
        }
    }

    Validator = (phongban_id) => {
        const rule = Joi.number().integer().required()
        return rule.validate(phongban_id);
    }
}

module.exports = SysUserFindByDepartmentIdRequest;