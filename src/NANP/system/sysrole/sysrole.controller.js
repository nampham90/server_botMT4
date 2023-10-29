const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const FindByIdLangProcess = require("../../common/process/findByIdLangProcess");
const FindByIdRequest = require("../../common/request/findByIdRequest");
const SysRoleFindAllProcess = require("./process/sysroleFindAllProcess");
const SysRoleSearchAllProcess = require("./process/sysroleSearchAllProcess");
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

    async searchAll(req, res) {
        await super.execute(res, async () => {
            const sysroleSearchAllProcess = new SysRoleSearchAllProcess();
            const result = sysroleSearchAllProcess.searchAll(req);
            return Result.success(result);
        })
    }

    async findById(req, res) {
        await super.execute(res, async () => {
            const reqFinById = new FindByIdRequest(req);
            if(reqFinById.error !== "") return Result.failure(9999, reqFinById.error);
            const findByIdProcess = new FindByIdLangProcess();
            const result = await findByIdProcess.findById(reqFinById,"sys_role");
            return Result.success(result);
        })
    }

    async create(req, res) {
        await super.execute(res, async () => {
            
        })
    }

    async update(req, res) {
        await super.execute(res, async () => {
            
        })
    }
    
    async delete(req, res) {
        await super.execute(res, async () => {
            
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

