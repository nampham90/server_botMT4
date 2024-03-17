const AbstractRequest = require("../../../../common/abstract/AbstractRequest");


class Spin00101FindOneRequest extends AbstractRequest {

    constructor(req){
        super(req);
        this.siplnno = "";
    }
}

module.exports = Spin00101FindOneRequest;