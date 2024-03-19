const AbstractRequest = require("../../../../common/abstract/AbstractRequest");

const Joi = require('joi');
class Spin00201FindConditonRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.condition = {}
        this.conditionSTS = {}

        const validate = this.Validator(req.body.filters);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = req.body.filters;
            if(req.body.filters.STS) {
                this.conditionSTS.ARVLCOMPFLG = req.body.filters.STS.ARVLCOMPFLG;
                this.conditionSTS.SICOMPFLG = req.body.filters.STS.SICOMPFLG;
                this.conditionSTS.RSLTSENDFLG = req.body.filters.STS.RSLTSENDFLG;
                delete this.condition.STS
            }
        }
    }

    Validator = (condition) =>{
        const rule = Joi.object({
            fromDate: Joi.date().optional(),
            toDate: Joi.date().optional(),
            SIPLNNO: Joi.string().length(14).optional(),
            STS: Joi.object({
                ARVLCOMPFLG: Joi.string().length(1),
                SICOMPFLG: Joi.string().length(1),
                RSLTSENDFLG: Joi.string().length(1)
            }).optional(),
            DIVKBN: Joi.string().max(4).optional(),
            SPPLYCD: Joi.number().integer().optional()
        })

        return rule.validate(condition);
    }
}

module.exports = Spin00201FindConditonRequest;