const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class DeleteIdProcess extends AbstractProcess {
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

module.exports = DeleteIdProcess;