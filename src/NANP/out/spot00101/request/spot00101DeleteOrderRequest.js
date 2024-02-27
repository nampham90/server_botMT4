const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDTO(condition) {
    this.SOODNO = condition.soodno;
}

class Spot00101DeleteOrderRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        this.condition = {};
        const validate = this.Validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDTO(req.body);
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            soodno: Joi.string().required()
        });
        return rule.validate(condition);
    }

}

module.exports = Spot00101DeleteOrderRequest;