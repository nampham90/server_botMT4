const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SequenceProcess = require("../../tcc/process/SequenceProcess");
const Spin00101CreateProcess = require("./process/spin00101CreateProcess");
const Spin00101FindOnePlanProcess = require("./process/spin00101FindOnePlanProcess");
const Spin00101CreateRequest = require("./request/spin00101CreateRequest");
const Spin00101FindOneRequest = require("./request/spin00101FindOneRequest");


class Spin00101Controller extends AbstractControllerAPI {
    async create(req, res) {
       super.execute(res, async () => {
           const tin020Create = new Spin00101CreateRequest(req);
           tin020Create.prefix = "ID";

           // tạo số ID 
           const sequenceProcess = new SequenceProcess();
           const ID = await sequenceProcess.getSequence(tin020Create);
           req.newID = ID;
           const spin00101CreateProcess = new Spin00101CreateProcess()
           const result = await spin00101CreateProcess.create(req);

           // returt ID 
           const reqFindOne = new Spin00101FindOneRequest(req);
           reqFindOne.siplnno = result;
           const spin00101FindOnePlanProcess = new Spin00101FindOnePlanProcess();
           const resultID = await spin00101FindOnePlanProcess.findOne(reqFindOne);

           return Result.success(resultID);
       })
    }
}

module.exports = new Spin00101Controller();
