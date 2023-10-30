const AbstractProcess = require("../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const PageInfo = require('../../../common/pageInfo/pageInfo');
class FindAllPageInfoProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findAll(req, model) {
        return this.executeModel(req ,model);
    }

    // req.condition từ điều chỉnh trong request
    async process(req, model) {
        const {rows, count} = await this.models[model].findAndCountAll(
            { where: Object.assign({},req.condition),limit: req.pageSize, offset: req.pageSize*( req.pageNum - 1)});
        return new PageInfo(count, rows, req.pageNum, req.pageSize);
    }
}

module.exports = FindAllPageInfoProcess;