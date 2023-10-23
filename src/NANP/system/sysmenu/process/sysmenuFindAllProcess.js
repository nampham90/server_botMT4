const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const dbMongo = require('../../../../model')
const MenuMongo = dbMongo.menu;


class SysMenuFindAllProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findAll(req) {
        return this.execute(req);
    }

    async process(req) {
        const lstMenuMongo = await MenuMongo.find({});
        const strSql = "SELECT * FROM sys_menus";
        let lstmenucover = []
        lstMenuMongo.forEach(menu => {
            let menucover = {
                id: menu._id.toString(),
                lang: menu.lang,
                menuName: menu.menuName,
                code: menu.code,
                fatherId: menu.fatherId + "",
                orderNum: menu.orderNum,
                path: menu.path,
                menuType: menu.menuType,
                visible: menu.visible,
                status: menu.status,
                icon: menu.icon,
                alIcon: menu.alIcon,
                newLinkFlag: menu.newLinkFlag
            }
            lstmenucover.push(menucover);
        })
    
        //await this.models.sys_menu.bulkCreate(lstmenucover);
        //return  this.models.sys_menu.findAll({});
        return lstmenucover;
    }
}

module.exports = SysMenuFindAllProcess