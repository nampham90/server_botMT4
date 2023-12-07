const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.menu_id = condition.idmenu || undefined;
} 

class SysDatascFindAllRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        this.condition = {};
        this.condition.lang = this.lang;
        if(req.body.filters.idmenu) {
            const validate = this.Validator(req.body.filters);
            if(validate.error) {
                this.error = validate.error.details[0].message;
            } else {
                this.condition = new ConditionDto(req.body.filters);
                this.condition.lang = this.lang;
            }
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            idmenu: Joi.string().required()
        });

        return rule.validate(condition);
    }
}


module.exports = SysDatascFindAllRequest;