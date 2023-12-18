const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const { ErrorCode } = require("../../../common/enums/ErrorCode");
const Result = require("../../../common/result/Result");
const SysMenuCreateProcess = require("./process/sysmenuCreateProcess");
const SysMenuDeleteProcess = require("./process/sysmenuDeleteprocess");
const SysMenuFindAllProcess = require("./process/sysmenuFindAllProcess");
const SysMenuFindByIdProcess = require("./process/sysmenuFindByIdProcess");
const SysMenuGetFromUrlProcess = require("./process/sysmenuGetFromUrlProcess");
const SysMenuUpdateProcess = require("./process/sysmenuUpdateProcess");
const SysMenuCreateRequest = require("./request/sysmenuCreateRequest");
const SysMenuDeleteRequest = require("./request/sysmenuDeleteRequest");
const SysMenuFindByIdRequest = require("./request/sysmenuFindByIdRequest");
const SysMenuUpdateRequest = require("./request/sysmenuUpdateRequest");

class SysMenuController extends AbstractControllerAPI {
    async findAll(req, res) {
        await super.execute(res, async () => {
            const sysmenuFindAllProcess = new SysMenuFindAllProcess();
            const lstmenu = await sysmenuFindAllProcess.findAll(req);
            return Result.success(lstmenu);
        })
    }

    async findById(req,res) {
        await super.execute(res, async() => {
            const reqFinById = new SysMenuFindByIdRequest(req);
            if(reqFinById.error !== "") return Result.failure(9999, reqFinById.error);
            const sysmenuFindByIdProcess = new SysMenuFindByIdProcess()
            const result = await sysmenuFindByIdProcess.findById(reqFinById);
            return Result.success(result);
        })
    }

    async create(req, res) {
        await super.execute(res, async() => {
            const reqCreate = new SysMenuCreateRequest(req);
            if(reqCreate.error !== "") return Result.failure(9999,reqCreate.error);
            const sysmenuCreateProcess = new SysMenuCreateProcess();
            const result = await sysmenuCreateProcess.create(reqCreate);
            if(result) return Result.success()
            return Result.failureCode(ErrorCode.SYS_ERR_CREATE_FAILED);
        })
    }

    async update(req,res) {
        await super.execute(res, async() => {
            const reqUpdate = new SysMenuUpdateRequest(req);
            if(reqUpdate.error !== "") return Result.failure(9999,reqUpdate.error);
            const sysmenuUpdateProcess = new SysMenuUpdateProcess();
            const result = await sysmenuUpdateProcess.update(reqUpdate);
            if(result) return Result.success(result);
            return Result.failureCode(ErrorCode.SYS_ERR_UPDATE_FAILED)
        })
    }

    async delete(req,res) {
        await super.execute(res, async() => {
            const reqDelete = new SysMenuDeleteRequest(req);
            if(reqDelete.error !== "") return Result.failure(9999,reqDelete.error);
            const sysmenuDeleteProcess = new SysMenuDeleteProcess();
            const result = await sysmenuDeleteProcess.delete(reqDelete);
            return Result.success(result);
        }) 
    }

    async getDetailMenuFromUrl(req, res) {
        await super.execute(res, async() => {
            const sysmenuGetFromUrl = new  SysMenuGetFromUrlProcess();
            const result =  await sysmenuGetFromUrl.getMenuFromUrl(req);
            return Result.success(result);
        })
    }

}

module.exports = new SysMenuController()