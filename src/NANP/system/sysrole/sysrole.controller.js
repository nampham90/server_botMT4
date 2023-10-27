const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SysRoleFindAllProcess = require("./process/sysroleFindAllProcess");
const SysRoleFindAllRequest = require("./request/sysroleFindAllRequest");

class SysRoleController extends AbstractControllerAPI {

    async findAll(req, res) {
        await super.execute(res, async () => {
            const reqFindAll = new SysRoleFindAllRequest(req);
            const sysroleFindAllRequest = new SysRoleFindAllProcess();
            const result = await sysroleFindAllRequest.findAll(reqFindAll);
            return Result.success(result);
        })
    }
}

module.exports = new SysRoleController()

