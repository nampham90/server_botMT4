const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const FindAllProductConditionProcess = require("../../common/process/findAllProductConditionProcess");
const FindAllProductConditionRequest = require("../../common/request/findAllProductConditionRequest");
const SequenceProcess = require("../../tcc/process/SequenceProcess");
const Spot00101FindByOrderRequest = require("../../tcc/request/SequenceRequest");
const Spot00101ListOrderProcess = require("./process/spot00101ListOrderProcess");
const Spot00101NewOrderProcess = require("./process/spot00101NewOrderProcess");
const Spot00101UpdateOrderProcess = require("./process/spot00101UpdateOrderProcess");
const Spot00101UpdateOrderRequest = require("./request/spot00101UpdateOrderRequest");
const client = require("@jsreport/nodejs-client")("http://localhost:5488", "admin", "nampham90");

class Spot00101Controller extends AbstractControllerAPI {

    async createOrder(req, res) {
        await super.execute(res, async () => {
            const reqFindByOrder = new Spot00101FindByOrderRequest(req);
            reqFindByOrder.prefix = "OD";

            // create OD number
            const sequenceProcess = new SequenceProcess();
            const OD = await sequenceProcess.getSequence(reqFindByOrder);
            req.newOD = OD;
            const spot00101NewOrderProcess = new Spot00101NewOrderProcess();
            const result = await spot00101NewOrderProcess.newOrder(req);

            // get list od
            const spot00101ListOrderProcess = new Spot00101ListOrderProcess();
            const lstOD = await spot00101ListOrderProcess.getListOrder(req);
            return Result.success(lstOD);
        });
    }

    async orderStatus(req, res) {
        await super.execute(res, async () => {
            const spot00101ListOrderProcess = new Spot00101ListOrderProcess();
            const lstOD = await spot00101ListOrderProcess.getListOrder(req);
            return Result.success(lstOD);
        })
    }

    async listProductInStck(req, res) {
        await super.execute(res, async () => {
            const reqFindAll = new FindAllProductConditionRequest(req);
            if(reqFindAll.error) return Result.failure(9999, reqFindAll.error);
            const findAllListSpInStck = new FindAllProductConditionProcess();
            const result = await findAllListSpInStck.findAllProductCondition(reqFindAll);
            return Result.success(result);
        })
    }

    async updateOreder(req, res) {
        await super.execute(res, async () => {
            const reqUpdateOrder = new Spot00101UpdateOrderRequest(req);
            const spot00101UpdateOrderProcess = new Spot00101UpdateOrderProcess();
            let result = await spot00101UpdateOrderProcess.updateOrder(reqUpdateOrder);
            return Result.success(result);


        })
    }

    async inbaogia(req,res) {
        const reqUpdateOrder = new Spot00101UpdateOrderRequest(req);
        //const data = reqUpdateOrder.order;
        let data = reqUpdateOrder.order;
        client.render({
            template: {name: 'book-main', recipe: "chrome-pdf" , engine: 'handlebars'},
            data: data,
        }).then(response => {
            response.body().then(data => {
                res.writeHead(200, {'Content-Type': 'application/pdf'});
                res.end(data)
            })
        });
    }
}

module.exports = new Spot00101Controller();