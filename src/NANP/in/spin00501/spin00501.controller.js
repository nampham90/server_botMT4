const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const Spin00501RegistProcess = require("./process/spin00501RegistProcess");
const Spin00501RegistRequest = require("./request/spin00501RegistRequest");

class Spin00501Controller extends AbstractControllerAPI {
    async regist(req, res) {
        super.execute(res, async () => {
            const reqRegister = new Spin00501RegistRequest(req);
            if(reqRegister.error) return Result.failure(9999,reqRegister.error);
            const spin00501RegistProcess = new Spin00501RegistProcess();
            const result = await spin00501RegistProcess.register();
            return Result.success(result);
        })

    }
}
module.exports = new Spin00501Controller();