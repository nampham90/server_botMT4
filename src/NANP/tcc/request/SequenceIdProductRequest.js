const AbstractRequest = require("../../../common/abstract/AbstractRequest");
const Joi = require('joi');
class SequenceIdProductRequest extends AbstractRequest {
    constructor(req) {
        super(req);
        this.catid = null;

        const validate = this.validator(req.body.category_id);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.catid = req.body.category_id;
        }
    }

    validator = (catid) => {
        const rule =Joi.number().integer().required()
        return rule.validate(catid);
    }
}

module.exports = SequenceIdProductRequest;