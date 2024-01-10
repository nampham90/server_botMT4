const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');

class SysDepartmentRegistRequest extends AbstractRequest {
    constructor(req){
        super(req);
        this.error = "";
        this.dataRegist = null;

        const validate = this.validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.dataRegist = req.body;
        }
    }

    validator = (data) => {
        const rule = Joi.object({
            tenphongban: Joi.string().required(),
            fatherId: Joi.number().integer().required(),
            state : Joi.boolean().required(),
            orderNum: Joi.number().integer().required()
        });
        return rule.validate(data);
    }
}

module.exports = SysDepartmentRegistRequest;