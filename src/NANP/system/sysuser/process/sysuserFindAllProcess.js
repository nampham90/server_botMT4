const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const PageInfo = require('../../../../common/pageInfo/pageInfo');
class SysUserFindAllProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findAll(req) {
        return this.execute(req);
    }

    async process(req) {
        let condition = {};
        if(req.phongban_id){
            condition.phongban_id = req.phongban_id;
        }
        const {rows, count} = await this.models.sys_user.findAndCountAll(
            {
                where: condition,limit: req.pageSize, offset: req.pageSize*( req.pageNum - 1), 
                attributes: {exclude: ['password']},
                include:[{model: this.models.sys_department},{model: this.models.sys_role}] 
            });
        return new PageInfo(count, rows, req.pageNum, req.pageSize);
    }
}

module.exports = SysUserFindAllProcess;