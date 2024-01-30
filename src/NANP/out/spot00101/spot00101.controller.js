const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const FindAllProductConditionProcess = require("../../common/process/FindAllProductConditionProcess");
const FindAllProductConditionRequest = require("../../common/request/FindAllProductConditionRequest");
const SequenceProcess = require("../../tcc/process/SequenceProcess");
const Spot00101FindByOrderRequest = require("../../tcc/request/SequenceRequest");
const Spot00101ListOrderProcess = require("./process/spot00101ListOrderProcess");
const Spot00101NewOrderProcess = require("./process/spot00101NewOrderProcess");


class Spot00101Controller extends AbstractControllerAPI {

    async createOrder(req, res) {
        await super.execute(res, async () => {
            const reqFindByOrder = new Spot00101FindByOrderRequest(req);
            reqFindByOrder.prefix = "OD";

            // create OD number
            const sequenceProcess = new SequenceProcess();
            const OD = await sequenceProcess.getSequence(reqFindByOrder);
            req.newOD = OD;
            // const spot00101NewOrderProcess = new Spot00101NewOrderProcess();
            // const result = await spot00101NewOrderProcess.newOrder(req);

            // get list od
            const spot00101ListOrderProcess = new Spot00101ListOrderProcess();
            const lstOD = await spot00101ListOrderProcess.getListOrder(req);
            return Result.success(lstOD);
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