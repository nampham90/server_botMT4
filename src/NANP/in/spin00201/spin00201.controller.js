const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const Spin00201FindConditionProcess = require("./process/spin00201FindConditionProcess");
const Spin00201FindConditonRequest = require("./request/spin00201FindConditionRequest");


class Spin00201Controller extends AbstractControllerAPI {

    async findConditionTin020(req, res) {
        super.execute(res, async () => {
            const reqFindCondition = new Spin00201FindConditonRequest(req);
            if(reqFindCondition.error) return Result.failure(9999,reqFindCondition.error);
            const spin00201FindConditionProcess = new Spin00201FindConditionProcess();
            const result = await spin00201FindConditionProcess.findConditon(reqFindCondition);
            return Result.success(result);
        })
    }
}
module.exports = new Spin00201Controller();