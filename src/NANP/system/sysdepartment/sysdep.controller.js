const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SysDepartmentFindAllProcess = require("./process/sysdepartmentFindAllProcess");
const SysDepartmentFindAllRequest = require("./request/sysdepartmentFindAllRequest");
const SysDepartmentFindByIdRequest = require("./request/sysdepartmentFindByIdRequest");
const SysDepartmentFindByIdProcess = require("./process/sysdepartmentFindByIdProcess");
const SysDepartmentUpdateRequest = require("./request/sysdepartmentUpdateRequest");
const SysDepartmentUpdateProcess = require("./process/sysdepartmentUpdateProcess");
const SysDepartmentRegistProcess = require("./process/sysdepartmentRegistProcess");
const SysDepartmentRegistRequest = require("./request/sysdepartmentRegistRequest");
const SysDepartmentDeleteRequest = require("./request/sysdepartmentDeleteRequest");
const SysDepartmentDeleteProcess = require("./process/sysdepartmentDeleteProcess");
const { ErrorCode } = require("../../../common/enums/ErrorCode");
class SysDepController extends AbstractControllerAPI {

    async findAll(req, res) {
        await super.execute(res, async () => {
            const reqFindAll = new SysDepartmentFindAllRequest(req)
            const sysdepFindAllProcess = new SysDepartmentFindAllProcess();
            const result = await sysdepFindAllProcess.findAll(reqFindAll);
            return Result.success(result)
        })
    }

    async findById(req, res) {
        await super.execute(res, async() => {
            const reqFindById = new SysDepartmentFindByIdRequest(req);
            if(reqFindById.error !== "") return Result.failure(9999, reqFindById.error);
            const sysdepartmentProcess = new SysDepartmentFindByIdProcess()
            const result = await sysdepartmentProcess.findById(reqFindById)
            if(result) return Result.success(result);
            return Result.failureCode(ErrorCode.SYS_ERR_RECORD_NOT_FOUND);
        })
    }

    async create(req, res) {
        await super.execute(res, async() => {
            const reqRegist = new SysDepartmentRegistRequest(req);
            if(reqRegist.error !== "") return Result.failure(9999, reqRegist.error);
            const sysdepartmentRegistProcess = new SysDepartmentRegistProcess();
            const result = await sysdepartmentRegistProcess.regist(reqRegist);
            if(result) return Result.success();
            return Result.failureCode(ErrorCode.SYS_ERR_CREATE_FAILED);
        })
    }

    async update(req, res) {
        await super.execute(res, async() => {
            const reqUpdate = new SysDepartmentUpdateRequest(req);
            if(reqUpdate.error !== "") return Result.failure(9999,reqUpdate.error);
            const sysdepartmentUpdateProcess = new SysDepartmentUpdateProcess();
            const result = await sysdepartmentUpdateProcess.update(reqUpdate);
            if(result) return Result.success(result);
            return Result.failureCode(ErrorCode.SYS_ERR_UPDATE_FAILED);
        })
    }


    async delete(req, res) {
        await super.execute(res, async() => {
            const reqDelete = new SysDepartmentDeleteRequest(req);
            if(reqDelete.error !== "") return Result.failure(9999, reqDelete.error);
            const sysdepartmentDeleteProcess = new SysDepartmentDeleteProcess();
            const result = await sysdepartmentDeleteProcess.delete(reqDelete);
            if(result) return Result.success();
            return Result.failureCode(ErrorCode.SYS_ERR_DELETE_FAILED);
        })
    }
}

module.exports = new SysDepController()

