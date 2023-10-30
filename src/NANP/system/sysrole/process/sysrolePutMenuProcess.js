const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysRolePutMenuProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async putMenu(req) {
        return this.execute(req);
    }

    async process(req) {
        const rlOne = await this.models.sys_role.findOne({where : {id: req.roleId, lang : req.lang}});
        if(rlOne) {
            let listmenus = [];
            for(let idRole of req.condition.permissionIds) {
                const m = await this.models.sys_menu.findOne({where: {id: idRole}});
                listmenus.push(m);
            }
            await rlOne.setSys_menus(listmenus);
            return 0;
        }
        return 99;
    }
}

module.exports = SysRolePutMenuProcess;