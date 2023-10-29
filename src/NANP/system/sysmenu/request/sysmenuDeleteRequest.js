const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.ids = condition.ids;
}
class SysMenuDeleteRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        if(req.body.ids) {
            const validate = this.Validator(req.body.ids);
            if(validate.error) {
                this.error = validate.error.details[0].message;
            } else {
                this.condition = new ConditionDto(req.body);
            }
        } 
       
    }

    Validator = (ids) => {
        const rule = Joi.array().items(Joi.string().length(24).required());
        return rule.validate(ids);
    }


}

module.exports = SysMenuDeleteRequest;