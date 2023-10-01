const { getValueObjectID } = require("./tool")
const moment = require("moment")
class MenuDto {
    constructor(MenuEnity) {
        this.id = MenuEnity._id.toString();
        this.lang = MenuEnity.lang;
        this.menu_name = MenuEnity.menuName;
        this.code = MenuEnity.code;
        this.father_id = getValueObjectID(MenuEnity.fatherId);
        this.order_num = MenuEnity.orderNum;
        this.path = MenuEnity.path;
        this.menu_type = MenuEnity.menuType;
        this.visible = MenuEnity.visible;
        this.status = MenuEnity.status;
        this.icon = MenuEnity.icon;
        this.al_icon = MenuEnity.alIcon;
        this.is_new_link = MenuEnity.newLinkFlag;
        this.create_time = moment();
        this.update_time = moment();
    }
}

module.exports = MenuDto