const AbstractControllerAPI = require("../../common/abstract/AbstractControllerAPI");
const Result = require("../../common/result/Result");
const FindAllProductConditionProcess = require("../common/process/findAllProductConditionProcess");
const FindAllProductConditionRequest = require("../common/request/findAllProductConditionRequest");

class StockController extends AbstractControllerAPI {
    async listProductInStck(req, res) {
        await super.execute(res, async() => {
            const reqFindAll = new FindAllProductConditionRequest(req);

            if(reqFindAll.error) return Result.failure(9999, reqFindAll.error);
            const findAllListSpInStck = new FindAllProductConditionProcess();
            const result = await findAllListSpInStck.findAllProductCondition(reqFindAll);
            return Result.success(result);
        })  
    }
}

module.exports = new StockController()