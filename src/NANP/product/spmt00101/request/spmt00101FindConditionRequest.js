const AbstractRequest = require("../../../../common/abstract/AbstractRequest");



class Spmt00101FindConditionRequest extends AbstractRequest {
    constructor(req) {
        super(req);
        this.error = ""
        this.condition = this.Validator(req.body.filters);
    }

    Validator = (reqcondition) => {
        let condition = {};
        if(!!reqcondition.category_id) {
            condition.category_id = reqcondition.category_id
        }

        if(!!reqcondition.product_name) {
            condition.product_name = reqcondition.product_name
        }

        return condition;
    }
}

module.exports = Spmt00101FindConditionRequest;