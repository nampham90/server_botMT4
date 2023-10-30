const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const Const = require("../../../common/const");
const FindByIdLangProcess = require("../../common/process/findByIdLangProcess");
const FindByIdRequest = require("../../common/request/findByIdRequest");
const SysRoleFindAllProcess = require("./process/sysroleFindAllProcess");
const SysRoleSearchAllProcess = require("./process/sysroleSearchAllProcess");
const SysRoleFindAllRequest = require("./request/sysroleFindAllRequest");
const SysRoleCreateRequest = require("./request/sysroleCreateRequest");
const CreateProcess = require("../../common/process/saveProcess");
const { ErrorCode } = require("../../../common/enums/ErrorCode");
const SysRoleUpdateRequest = require("./request/sysroleUpdateRequest");
const UpdateProcess = require("../../common/process/updateProcess");
const DeleteRequest = require("../../common/request/deleteRequest");
const DeleteIdLangProcess = require("../../common/process/deleteIdProcess");

class SysRoleController extends AbstractControllerAPI {

    async findAll(req, res) {
        await super.execute(res, async () => {
            const reqFindAll = new SysRoleFindAllRequest(req);
            const sysroleFindAllRequest = new SysRoleFindAllProcess();
            const result = await sysroleFindAllRequest.findAll(reqFindAll);
            return Result.success(result);
        })
    }

    async searchAll(req, res) {
        await super.execute(res, async () => {
            const sysroleSearchAllProcess = new SysRoleSearchAllProcess();
            const result = await sysroleSearchAllProcess.searchAll(req);
            return Result.success(result);
        })
    }

    async findById(req, res) {
        await super.execute(res, async () => {
            const reqFinById = new FindByIdRequest(req);
            if(reqFinById.error !== "") return Result.failure(9999, reqFinById.error);
            const findByIdProcess = new FindByIdLangProcess();
            const result = await findByIdProcess.findById(reqFinById, Const.RoleModel);
            return Result.success(result);
        })
    }

    async create(req, res) {
        await super.execute(res, async () => {
            const reqCreate = new SysRoleCreateRequest(req);
            if(reqCreate.error !== "") return Result.failure(9999, reqCreate.error);
            const saveProcess = new CreateProcess()
            const result = await saveProcess.save(reqCreate,Const.RoleModel);
            if(result) return Result.success(result);
            return Result.failureCode(ErrorCode.SYS_ERR_CREATE_FAILED);
        })
    }

    async update(req, res) {
        await super.execute(res, async () => {
            const reqUpdate = new SysRoleUpdateRequest(req);
            if(reqUpdate.error !== "") return Result.failure(9999, reqUpdate.error);
            const updateProcess = new UpdateProcess();
            const result = await updateProcess.update(reqUpdate, Const.RoleModel);
            if(result === 1) return Result.success();
            return Result.failureCode(ErrorCode.SYS_ERR_UPDATE_FAILED);
        })
    }
    
    async delete(req, res) {
        await super.execute(res, async () => {
            const reqDelete = new DeleteRequest(req);
            if(reqDelete.error !== "") return Result.failure(9999, reqDelete.error);
            const deleteProcess = new DeleteIdLangProcess();
            const result = await deleteProcess.delete(reqDelete, Const.RoleModel);
            
        })
    }

    async GetpermissionRole(req,res) {
        await super.execute(res, async () => {
            
        })
    }

    async PutpermissionRole(req,res) {
        await super.execute(res, async () => {
            
        })
    }
}

module.exports = new SysRoleController()

