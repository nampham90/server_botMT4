const AbstractProcess = require("../../../common/abstract/AbstractProcess");

class FindAllConditionProcess extends AbstractProcess {
    constructor() {
        super();
    }
    async findAllCondition(req, model) {
        return this.executeModel(req, model);
    }

    async process(req,model) {
        const rows = await this.models[model].findAll({
            where: Object.assign({},req.condition)
        });
        return rows;
    }
}

module.exports = FindAllConditionProcess;