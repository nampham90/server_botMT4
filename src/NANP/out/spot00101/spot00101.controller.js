const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const FindAllProductConditionProcess = require("../../common/process/FindAllProductConditionProcess");
const FindAllProductConditionRequest = require("../../common/request/FindAllProductConditionRequest");
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

    async listProductInStck(req, res) {
        await super.execute(res, async () => {
            const reqFindAll = new FindAllProductConditionRequest(req);
            if(reqFindAll.error) return Result.failure(9999, reqFindAll.error);
            const findAllListSpInStck = new FindAllProductConditionProcess();
            const result = await findAllListSpInStck.findAllProductCondition(reqFindAll);
            return Result.success(result);
        })
    }
}

module.exports = new Spot00101Controller();