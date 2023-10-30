const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysRoleGetMenuProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async getMenu(req) {
        return this.execute(req);
    }

    async process(req) {

        let lstPermission = [];
        const strsql =  " SELECT m.code AS permissionCode FROM sys_roles r  " +
        " LEFT JOIN role_menu rm ON r.id = rm.sysRoleId " +
        " LEFT JOIN sys_menus m ON rm.sysMenuId = m.id " +
        " AND m.lang = ? " +
        " WHERE r.id = ? "

        const result = await this.sequelize.query(strsql,{
            replacements: [req.lang, req.condition.id],
            type: QueryTypes.SELECT
        })
        if(result.length > 0) {
            lstPermission = result.map(item => item.permissionCode)
        }
        return lstPermission;
    }
}

module.exports = SysRoleGetMenuProcess;