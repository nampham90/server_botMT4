const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const ObjectId = require('mongodb').ObjectId;
class SysMenuCreateProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async save(req, model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        const m = await this.models[model].create(req.condition)
        if(m) return m;
        return null;
    }
}

module.exports = SysMenuCreateProcess