const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');


class SysDepartmentDeleteRequest extends AbstractRequest {

    constructor(req) {
        super(req);
        this.error = "";
        this.id = null;

        const validate = this.validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.id = req.body.id;
        }
    }

    validator = (condition) => {
        const rule = Joi.object({
            id: Joi.number().integer().required()
        });
        return rule.validate(condition);
    }
    
}

module.exports = SysDepartmentDeleteRequest;