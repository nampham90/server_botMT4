const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const PageInfo = require('../../../../common/pageInfo/pageInfo');
const { mergeListUser } = require("../../../../validations/auth");
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
        const {count, rows} = await this.models.sys_user.findAndCountAll(
            {
                where: condition,
                include:[{model: this.models.sys_department},{model: this.models.sys_role}],limit: req.pageSize, offset: req.pageSize*( req.pageNum - 1), 
                attributes: {exclude: ['password']},
                distinct: true
            });
        let mergeUser = mergeListUser(rows);
        console.log(mergeUser);
        return new PageInfo(count, mergeUser, req.pageNum, req.pageSize);
    }
}

module.exports = SysUserFindAllProcess;