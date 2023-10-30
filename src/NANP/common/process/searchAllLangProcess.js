const AbstractProcess = require("../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const PageInfo = require('../../../../common/pageInfo/pageInfo');
class SearchAllLangProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async searchAll(req, model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        const lstRole = await this.models[model].findAll({where: {lang: req.lang}});
        return lstRole;
    }
}

module.exports = SearchAllLangProcess;