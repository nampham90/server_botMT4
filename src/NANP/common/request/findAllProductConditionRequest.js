const AbstractRequest = require("../../../common/abstract/AbstractRequest");
const Joi = require('joi');

class FindAllProductConditionRequest extends AbstractRequest {
    constructor(req) {
        super(req);

        this.error = "";
        this.conditions = {};

        const {value, error} = this.validator(req.body.filters);
        if(error) {
            this.error = error.details[0].message;
        } else {
            this.conditions = value;
        }
    }

    validator = (inputObject) => {
        const rule = Joi.object({
            QTYCD: Joi.string().allow(null, ''),
            CATCD: Joi.string().allow(null, ''),
            SUPPLYCD: Joi.number().allow(null, ''),
            MANUFACTTURECD: Joi.number().allow(null, ''),
        });
        return rule.validate(inputObject);
    }
}

module.exports = FindAllProductConditionRequest