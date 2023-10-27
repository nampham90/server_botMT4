const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SysDepartmentFindAllProcess = require("./process/sysdepartmentFindAllProcess");
const SysDepartmentFindAllRequest = require("./request/sysdepartmentFindAllRequest");

class SysDepController extends AbstractControllerAPI {

    async findAll(req, res) {
        await super.execute(res, async () => {
            const reqFindAll = new SysDepartmentFindAllRequest(req)
            const sysdepFindAllProcess = new SysDepartmentFindAllProcess();
            const result = await sysdepFindAllProcess.findAll(reqFindAll);
            return Result.success(result)
        })
    }
}

module.exports = new SysDepController()

