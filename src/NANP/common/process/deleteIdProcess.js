const AbstractProcess = require("../../../common/abstract/AbstractProcess");
class DeleteIdLangProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async delete(req,model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        const deletes = await this.models[model].destroy({where: {id: req.condition.ids}});
        return deletes[0];
    }
}

module.exports = DeleteIdLangProcess;