const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(id) {
    this.id = id;
}
class SysFindByIdRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.Validator(req.params.id);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.params.id);
        }
    }

    Validator = (id) => {
        const rule = Joi.number().integer().required()
        return rule.validate(id);
    }


}

module.exports = SysFindByIdRequest;