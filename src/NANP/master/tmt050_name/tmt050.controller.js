const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const { ErrorCode } = require("../../../common/enums/ErrorCode");
const Result = require("../../../common/result/Result");
const FindAllConditionProcess = require("../../common/process/findAllConditionProcess");
const Tmt050FindRcdkbnProcess = require("./process/tmt050FindRcdkbnProcess");
const Tmt050FindRcdkbnRequest = require("./request/tmt050FindRcdkbnRequest");


class Tmt050Controller extends AbstractControllerAPI {

    async findByRcdkbn(req, res) {
        await super.execute(res, async () => {
            const reqTmt050 = new Tmt050FindRcdkbnRequest(req);
            if(reqTmt050.error !== "") return Result.failure(9999, reqTmt050.error);
            const tmt050FindRcdkbnProcess = new FindAllConditionProcess();
            const result = await tmt050FindRcdkbnProcess.findAllCondition(reqTmt050, "Tmt050Name");
            if(result.length > 0) return Result.success(result);
            else return Result.failureCode(ErrorCode.SYS_ERR_RECORD_NOT_FOUND);
        })
    }
}

module.exports = new Tmt050Controller();