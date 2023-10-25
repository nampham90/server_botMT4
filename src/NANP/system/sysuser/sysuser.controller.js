const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const LoginProcess = require("./process/loginProcess");
const SysUserFindByIdProcess = require("./process/sysuserFindByIdProcess");
const SysUserGetListMenuProcess = require("./process/sysuserGetListMenuProcess");
const LoginRequest = require('./request/loginRequest');
const SysFindByIdRequest = require('./request/sysuserFindByIdRequest');
const SysUserGetMenuRequest = require("./request/sysuserGetListMenuProcess");
class SysUserController extends AbstractControllerAPI {
     async login(req, res){
        await super.execute(res, async () => {
            const reqLogin  = new LoginRequest(req);
            if(reqLogin.error) 
                return Result.failure(9999, reqLogin.error);
            const loginProcess = new LoginProcess();
            const result = await loginProcess.login(reqLogin.condition);
            if(result.code) return Result.failure(result);
            return Result.success(result);
        })
    }

    async findById(req, res) {
        await super.execute(res, async() => {
            const reqFindById = new SysFindByIdRequest(req);
            if(reqFindById.error) 
                return Result.failure(9999, reqLogin.error);
            const sysUserFindByIdProcess = new SysUserFindByIdProcess();
            const result = await sysUserFindByIdProcess.findById(reqFindById.condition);
            if(result.code) Result.failure(result)
            return Result.success(result);;
        })
    }

    async gitListMenu(req, res) {
        await super.execute(res, async() => {
            const reqGetListMenu = new SysUserGetMenuRequest(req);
            if(reqGetListMenu.error) 
                return Result.failure(9999, reqGetListMenu.error);
            const sysuserGetListMenuProcess = new SysUserGetListMenuProcess();
            const result = await sysuserGetListMenuProcess.getListMenu(reqGetListMenu.condition);
            return Result.success(result);
        })
    }
}

module.exports = new SysUserController()