const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SequenceProcess = require("../../tcc/process/SequenceProcess");
const Spot00101FindByOrderRequest = require("../../tcc/request/SequenceRequest");


class Spot00101Controller extends AbstractControllerAPI {

    async createOrder(req, res) {
        await super.execute(res, async () => {
            const reqFindByOrder = new Spot00101FindByOrderRequest(req);
            reqFindByOrder.prefix = "OD";

            const sequenceProcess = new SequenceProcess();
            const result = await sequenceProcess.getSequence(reqFindByOrder);
            return Result.success(result);
        });
    }
}

module.exports = new Spot00101Controller();