const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const { ErrorCode } = require("../../../common/enums/ErrorCode");
const Result = require("../../../common/result/Result");
const LoginProcess = require("./process/loginProcess");
const SysUserCreateProcess = require("./process/sysuserCreateProcess");
const SysUserFindAllProcess = require("./process/sysuserFindAllProcess");
const SysUserFindByIdProcess = require("./process/sysuserFindByIdProcess");
const SysUserGetListMenuProcess = require("./process/sysuserGetListMenuProcess");
const LoginRequest = require('./request/loginRequest');
const SysUserCreateRequest = require("./request/sysuserCreateRequest");
const SysUserFindAllRequest = require("./request/sysuserFindAllRequest");
const SysFindByIdRequest = require('./request/sysuserFindByIdRequest');
const SysUserGetMenuRequest = require("./request/sysuserGetListMenuRequest");
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

    async findAll(req, res) {
        await super.execute(res, async() => {
            const reqFindAll = new SysUserFindAllRequest(req)
            const sysuserFindAllProcess = new SysUserFindAllProcess();
            const result = await sysuserFindAllProcess.findAll(reqFindAll.condition)
            return Result.success(result);
        })
    }

    async getListMenu(req, res) {
        await super.execute(res, async() => {
            const reqGetListMenu = new SysUserGetMenuRequest(req);
            if(reqGetListMenu.error) 
                return Result.failure(9999, reqGetListMenu.error);
            const sysuserGetListMenuProcess = new SysUserGetListMenuProcess();
            const result = await sysuserGetListMenuProcess.getListMenu(reqGetListMenu.condition);
            return Result.success(result);
        })
    }

    async create(req, res) {
        await super.execute(res, async () => {
            const reqCreate = new SysUserCreateRequest(req);
            if(reqCreate.error !== "")
                return Result.failure(9999, reqCreate.error);
            const sysUserCreateProcess = new SysUserCreateProcess();
            const result = await sysUserCreateProcess.create(reqCreate.condition);
            if(result) return Result.success();
            return Result.failure(ErrorCode.SYS_ERR_CREATE_FAILED);
        })
    }
}

module.exports = new SysUserController()