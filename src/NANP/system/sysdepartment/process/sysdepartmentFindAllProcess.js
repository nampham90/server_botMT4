const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const PageInfo = require('../../../../common/pageInfo/pageInfo');
class SysDepartmentFindAllProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findAll(req) {
        return this.execute(req);
    }

    async process(req) {
        let condition = {};
        if(req.condition) {
            if(req.condition.tenphongban){
                condition.tenphongban = req.condition.tenphongban;
            }
        }

        const {rows, count} = await this.models.sys_department.findAndCountAll(
            { where: condition,limit: req.pageSize, offset: req.pageSize*( req.pageNum - 1)});
        return new PageInfo(count, rows, req.pageNum, req.pageSize);
    }
}

module.exports = SysDepartmentFindAllProcess;