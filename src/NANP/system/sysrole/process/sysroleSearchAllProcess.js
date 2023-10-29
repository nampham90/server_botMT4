const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const PageInfo = require('../../../../common/pageInfo/pageInfo');
class SysRoleSearchAllProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async searchAll(req) {
        return this.execute(req);
    }

    async process(req) {
        const lstRole = await this.models.sys_role.findAll({});
        return lstRole;
    }
}

module.exports = SysRoleSearchAllProcess;