const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const ObjectId = require('mongodb').ObjectId;
class SysMenuCreateProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async create(req) {
        return this.execute(req);
    }

    async process(req) {
        const {menuName, code, fatherId, orderNum, path, menuType, visible,status,icon , alIcon, newLinkFlag} = req.condition;
        const menu = await this.models.sys_menu.create({
            id: new ObjectId().toString(),
            lang: req.lang,
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
        })
        if(menu) return menu;
        return null;
    }
}

module.exports = SysMenuCreateProcess