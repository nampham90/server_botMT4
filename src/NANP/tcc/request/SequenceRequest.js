const AbstractRequest = require("../../../common/abstract/AbstractRequest");


class Spot00101FindByOrderRequest extends AbstractRequest {
    constructor(req) {
        super(req);
        this.prefix = null;
    }
}

module.exports = Spot00101FindByOrderRequest;