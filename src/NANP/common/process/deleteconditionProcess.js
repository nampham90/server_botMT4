const AbstractProcess = require("../../../common/abstract/AbstractProcess");


class DeleteConditionProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async deleteCondition(req, model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        let condition = req.condition;
        const deletesCondition = await this.models[model].destroy({
            where: condition,
            cascade: true 
        });
        return deletesCondition[0];
    }
}

module.exports = DeleteConditionProcess;