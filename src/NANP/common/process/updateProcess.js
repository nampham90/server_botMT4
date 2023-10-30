const AbstractProcess = require("../../../common/abstract/AbstractProcess");

class UpdateProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async update(req, model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        let condition = {}
        let dataUpdate = {}
        condition = req.condition;
        dataUpdate = req.dataUpdate;

        const m = await this.models[model].findOne( {where: Object.assign({},condition)});
        if(m) {
            const affectedRows = await this.models[model].update(
                Object.assign({},dataUpdate), {where: Object.assign({},condition)})
            return affectedRows[0];
        }
        return null
    }
}
// dataUpdate phải đươc thiết lập và kiểm tra ở request
// req.condition phải được kiểm tra ở request

module.exports = UpdateProcess;