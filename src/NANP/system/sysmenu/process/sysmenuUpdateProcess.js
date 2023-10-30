const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const bcrypt = require('bcryptjs');

class SysMenuUpdateProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async update(req) {
        return this.execute(req);
    }

    async process(req) {
        const {id,menuName, code, fatherId, orderNum, path, menuType, visible,status,icon , alIcon, newLinkFlag} = req.condition;

        const menu = await this.models.sys_menu.findByPk(id);
        if(menu) {
            const affectedRows = await this.models.sys_menu.update({
                menuName: menuName,
                code: code,
                fatherId: fatherId,
                orderNum: orderNum,
                path: path,
                menuType:menuType,
                visible: visible,
                status: status,
                icon: icon,
                alIcon: alIcon,
                newLinkFlag: newLinkFlag,
            }, {where: {id:id ,lang: req.lang}})
            return affectedRows[0];
        }
        return null
    }
}

module.exports = SysMenuUpdateProcess