const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const LoginProcess = require("./process/loginProcess");
const SysUserFindByIdProcess = require("./process/sysuserFindByIdProcess");
const LoginRequest = require('./request/loginRequest');
const SysFindByIdRequest = require('./request/sysuserFindByIdRequest');
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
}

module.exports = new SysUserController()