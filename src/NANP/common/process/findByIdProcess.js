const AbstractProcess = require("../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class FindByIdProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findById(req, model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {

        const m = await this.models[model].findOne({where: {id : req.condition.id}});
        if(!m) return new ErrorCodeEnum(ErrorCode.SYS_ERR_ACCOUNT_NULL);
        return m
    }
}

module.exports = FindByIdProcess;