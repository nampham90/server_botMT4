const AbstractProcess = require("../../../common/abstract/AbstractProcess");

class DeleteIdProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async delete(req,model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        const deletes = await this.models[model].destroy({where: {id: req.condition.ids, lang: req.lang}});
        return deletes[0];
    }
}

module.exports = DeleteIdProcess;