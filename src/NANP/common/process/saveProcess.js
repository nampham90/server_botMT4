const AbstractProcess = require("../../../common/abstract/AbstractProcess");
const ObjectId = require('mongodb').ObjectId;
class CreateProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async save(req, model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        const m = await this.models[model].create(req.dataCreate)
        if(m) return m;
        return null;
    }
}
// dateCreate phải được kiểm trả ở request

module.exports = CreateProcess