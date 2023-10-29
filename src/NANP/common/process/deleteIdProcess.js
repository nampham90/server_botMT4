const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class DeleteIdLangProcess extends AbstractProcess {
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

module.exports = DeleteIdLangProcess;