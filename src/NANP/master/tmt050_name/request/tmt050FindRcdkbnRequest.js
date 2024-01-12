const Joi = require("joi");
const AbstractRequest = require("../../../../common/abstract/AbstractRequest");


class Tmt050FindRcdkbnRequest extends AbstractRequest {
    constructor(req) {
        super(req);
        this.error = "";
        this.condition = {};
        const validate = this.Validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = req.body;
        }
    }

    Validator = (condition) => {
        const rule = Joi.object({
            RCDKBN : Joi.string().length(4).required()
        });
        return rule.validate(condition);
    }
}

module.exports = Tmt050FindRcdkbnRequest;