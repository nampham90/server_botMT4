const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');

class Spmt00101RegistProductRequest extends AbstractRequest {
    constructor(req, seqno) {
        super(req)
        this.dataRegist = null;
        this.error = "";

        const validate = this.validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.dataRegist = {
                category_id: req.body.category_id,
                product_name: req.body.product_name,
                seqno: seqno
            }
        }
    }

    validator = (condition) => {
        const rule = Joi.object({
            category_id: Joi.number().integer().required(),
            product_name: Joi.string().required(),
        });
        return rule.validate(condition);
    }
}

module.exports = Spmt00101RegistProductRequest;