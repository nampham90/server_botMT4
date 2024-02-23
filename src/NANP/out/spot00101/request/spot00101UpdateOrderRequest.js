const AbstractRequest = require("../../../../common/abstract/AbstractRequest");


class Spot00101UpdateOrderRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        this.order = req.body.order;
    }
}

module.exports = Spot00101UpdateOrderRequest;