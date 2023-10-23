const AbstractControllerSocket = require("../../../common/abstract/AbstractControllerSocket");
const dbCon = require('../../../common/DBConnect');
const Const = require("../../../common/const")
const Result = require("../../../common/result/Result");
const DemoGetListProcess = require('../process/demoGetListProcess');
class ProductController extends AbstractControllerSocket{
    constructor() {
        super();
    }

    async list(req,socket) {
        await super.execute(Const.demoListProduct,socket, async () => {
            const demoGetListProcess = new DemoGetListProcess(dbCon.dbDemo);
            await demoGetListProcess.start();
            const session = demoGetListProcess.transaction;
            let res = await demoGetListProcess.listProduct(req,session);
            await demoGetListProcess.commit();
            return Result.success(res);
        })
    }
}

module.exports =  ProductController