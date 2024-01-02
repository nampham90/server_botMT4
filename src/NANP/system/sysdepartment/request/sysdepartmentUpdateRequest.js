const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');

class SysDepartmentUpdateRequest extends AbstractRequest {
    constructor(req){
        super(req)
        this.error = "";
        this.dataUpdate = null;

        const validator = this.validator(req.body);
        if(validator.error){
            this.error = validator.error.details[0].message;
        } else{
            this.dataUpdate = req.body;
        }
    }

    validator = (condition) => {
        const rule = Joi.object({
            id: Joi.number().integer().required(),
            state: Joi.boolean().required(),
            tenphongban: Joi.string().required(),
            orderNum: Joi.number().integer().required(),
            fatherId: Joi.number().integer().required(),
        })
        return rule.validate(condition);
    }

}

module.exports = SysDepartmentUpdateRequest;