const AbstractRequest = require("../../../../common/abstract/AbstractRequest");


class Spin00101CreateRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.prefix = null;
    }
}

module.exports = Spin00101CreateRequest;