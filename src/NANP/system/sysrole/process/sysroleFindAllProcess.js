const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const PageInfo = require('../../../../common/pageInfo/pageInfo');
class SysRoleFindAllProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findAll(req) {
        return this.execute(req);
    }

    async process(req) {
        let condition = {};
        if(req.condition.rolename){
            condition.rolename = req.condition.rolename;
        }
        const {rows, count} = await this.models.sys_role.findAndCountAll(
            { where: condition,limit: req.pageSize, offset: req.pageSize*( req.pageNum - 1)});
        return new PageInfo(count, rows, req.pageNum, req.pageSize);
    }
}

module.exports = SysRoleFindAllProcess;