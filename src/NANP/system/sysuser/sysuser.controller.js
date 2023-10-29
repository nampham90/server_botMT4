const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const { ErrorCode } = require("../../../common/enums/ErrorCode");
const Result = require("../../../common/result/Result");
const LoginProcess = require("./process/loginProcess");
const SysUserChangePasswordProcess = require("./process/sysuserChangePasswordProcess");
const SysUserCheckEmailProcess = require("./process/sysuserCheckEmailProcess");
const SysUserCheckNameProcess = require("./process/sysuserCheckNameProcess");
const SysUserCreateProcess = require("./process/sysuserCreateProcess");
const SysUserDeleteProcess = require("./process/sysuserDeleteProcess");
const SysUserFindAllProcess = require("./process/sysuserFindAllProcess");
const SysUserFindByIdProcess = require("./process/sysuserFindByIdProcess");
const SysUserGetListMenuProcess = require("./process/sysuserGetListMenuProcess");
const SysUserUpdateProcess = require("./process/sysuserUpdateProcess");
const LoginRequest = require('./request/loginRequest');
const SysUserChangePasswordRequest = require("./request/sysuserChangePasswrodRequest");
const SysUserCheckEmailRequest = require("./request/sysuserCheckEmailRequest");
const SysUserCheckNameRequest = require("./request/sysuserCheckNameRequest");
const SysUserCreateRequest = require("./request/sysuserCreateRequest");
const SysUserDeleteRequest = require("./request/sysuserDeleteRequest");
const SysUserFindAllRequest = require("./request/sysuserFindAllRequest");
const SysFindByIdRequest = require('./request/sysuserFindByIdRequest');
const SysUserGetMenuRequest = require("./request/sysuserGetListMenuRequest");
const SysUserUpdateRequest = require("./request/sysuserUpdateRequest");
class SysUserController extends AbstractControllerAPI {
     async login(req, res){
        await super.execute(res, async () => {
            const reqLogin  = new LoginRequest(req);
            if(reqLogin.error) 
                return Result.failure(9999, reqLogin.error);
            const loginProcess = new LoginProcess();
            const result = await loginProcess.login(reqLogin.condition);
            if(result.code) return Result.failure(result.code, result.message);
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
            if(result.code) Result.failure(result.code, result.message)
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
            return Result.failureCode(ErrorCode.SYS_ERR_CREATE_FAILED);
        })
    }

    async update(req, res) {
        await super.execute(res,async ()=> {
            const reqUpdate = new SysUserUpdateRequest(req);
            if(reqUpdate.error !== "")
               return Result.failure(9999, reqUpdate.error);
            const sysUserUpdateProcess = new SysUserUpdateProcess();
            const result = await sysUserUpdateProcess.update(reqUpdate.condition);
            if(result) return Result.success()
            return Result.failureCode(ErrorCode.SYS_ERR_UPDATE_FAILED);
        })
    }

    async delete(req, res) {
        await super.execute(res, async() => {
            const reqDeletes = new SysUserDeleteRequest(req);
            if(reqDeletes.error !== "") return Result.failure(9999,reqDeletes.error);
            const sysUserDeleteProcess = new SysUserDeleteProcess();
            const result = await sysUserDeleteProcess.delete(reqDeletes.condition);
            return Result.success(result);
        })
    }

    async checkEmail(req, res){
        await super.execute(res, async() => {
            const reqCheckEmail = new SysUserCheckEmailRequest(req);
            if(reqCheckEmail.error !== "") return Result.failure(9999,reqCheckEmail.error);
            const sysUserCheckEmailProcess = new SysUserCheckEmailProcess();
            const result = await sysUserCheckEmailProcess.checkEmail(reqCheckEmail.condition);
            return  Result.success(result);
        })
    } 

    async checkName(req, res) {
        await super.execute(res, async() => {
            const reqCheckName = new SysUserCheckNameRequest(req);
            if(reqCheckName.error !== "") return Result.failure(9999,reqCheckName.error);
            const sysUserCheckNameProcess = new SysUserCheckNameProcess();
            const result = await sysUserCheckNameProcess.checkName(reqCheckName.condition);
            return Result.success(result);
        })
    }

    async changePassword(req,res) {
        await super.execute(res, async () => {
            const reqChangepass = new SysUserChangePasswordRequest(req);
            if(reqChangepass.error !== "")
               return Result.failure(9999, reqChangepass.error);
            const sysUserChangePasswordProcess = new SysUserChangePasswordProcess();
            const result = await sysUserChangePasswordProcess.changePassword(reqChangepass);
            if(result.code) return Result.failure(result.code, result.message);
            return Result.success();
        })
    }
}

module.exports = new SysUserController()