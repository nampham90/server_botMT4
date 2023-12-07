const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const FindAllPageInfoProcess = require("../../common/process/findAllPageInfoProcess");
const SysDatascFindAllRequest = require("./request/sysdatascFindAllRequest");
const Result = require("../../../common/result/Result");
class SysDatascController extends AbstractControllerAPI {

    async findAll(req, res) {
        await super.execute(res, async () => {
            const reqFindAllDatasc = new SysDatascFindAllRequest(req);
            if(reqFindAllDatasc.error !== "") return Result.failure(9999, reqFindAllDatasc.error);
            const findallProcess = new FindAllPageInfoProcess();
            const result = await findallProcess.findAll(reqFindAllDatasc,"TMT340FORMITEMNM");
            return Result.success(result);
        })

    }

    async addList(req, res) {

    }

    async findById(req, res) {
        
    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new SysDatascController();