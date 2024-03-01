const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const { ErrorCode } = require("../../../common/enums/ErrorCode");
const Result = require("../../../common/result/Result");
const FindAllPageInfoProcess = require("../../common/process/findAllPageInfoProcess");
const SequenceIdProductProcess = require("../../tcc/process/SequenceIdProductProcess");
const SequenceIdProductRequest = require("../../tcc/request/SequenceIdProductRequest");
const Spmt00101RegistProductProcess = require("./process/spmt00101RegistProductProcess");
const Spmt00101FindConditionRequest = require("./request/spmt00101FindConditionRequest");
const Spmt00101RegistProductRequest = require("./request/spmt00101RegistProductProcess");


class Spmt00101Controller extends AbstractControllerAPI {

    async findConditon(req,res) {
        await super.execute(res, async () => {
            const reqFilters = new Spmt00101FindConditionRequest(req);
            const spmt00101FindConditoinProcess = new FindAllPageInfoProcess();
            const result = await spmt00101FindConditoinProcess.findAll(reqFilters, "Product");
            return Result.success(result);
        })
    }

    async regist(req, res) {
        await super.execute(res, async () => {
            const reqRegist = new SequenceIdProductRequest(req);
            if(!!reqRegist.error) return Result.failure(9999, reqRegist.error);
            const sequenceIdProductProcess = new SequenceIdProductProcess();
            const Seqno = await sequenceIdProductProcess.getSequenceIdProduct(reqRegist);
            if(Seqno) {
                // thực hiện proces đăng ký sản phẩm
                const reqRegistProduct = new Spmt00101RegistProductRequest(req,Seqno);
                if(!!reqRegistProduct.error) return Result.failure(9999, reqRegistProduct.error);
                const spmt00101RegistProductProcess = new Spmt00101RegistProductProcess()
                const result = await spmt00101RegistProductProcess.regist(reqRegistProduct);
                return Result.success(result);
            } else {
                return Result.failureCode(ErrorCode.SYS_ERR_RECORD_NOT_FOUND);
            }
        })
    }
}

module.exports = new Spmt00101Controller()