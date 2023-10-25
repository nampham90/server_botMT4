const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysUserGetListMenuProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async getListMenu(req) {
        return this.execute(req);
    }

    async process(req) {
        const strSql = " SELECT  p.id,p.lang,p.menuName,p.code,p.fatherId,p.orderNum,p.path,p.menuType,p.visible,p.status,p.newLinkFlag,p.alIcon,p.icon,p.createdAt,p.updatedAt FROM user_role ur " +
                       " JOIN role_menu rp ON ur.sysRoleId = rp.sysRoleId " +
                       " JOIN sys_menus p ON rp.sysMenuId = p.id " +
                       " AND p.lang = ? " +
                       " WHERE ur.sysUserId =  ?" +
                       " GROUP BY p.id " 
        const result =  await this.sequelize.query(strSql, {
            replacements: [req.lang, req.id],
            type: QueryTypes.SELECT
        });
        return result;
    }
}

module.exports = SysUserGetListMenuProcess;