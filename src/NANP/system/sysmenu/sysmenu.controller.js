const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SysMenuFindAllProcess = require("./process/sysmenuFindAllProcess")

class SysMenuController extends AbstractControllerAPI {
    async findAll(req, res) {
        await super.execute(res, async () => {
            const sysmenuFindAllProcess = new SysMenuFindAllProcess();
            const lstmenu = await sysmenuFindAllProcess.findAll(req);
            return Result.success(lstmenu);
        })
    }
}

module.exports = new SysMenuController()